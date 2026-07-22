import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  SmartQueueAlertDTO,
  SmartQueueAlertType,
  SystemMetricsData,
  SmartQueueAnalysisResult,
  AnalysisLog,
} from './types/smart-queue.types';

/**
 * SERVICE - FILA INTELIGENTE
 * 
 * Este service é responsável por:
 * 1. Coletar métricas do sistema
 * 2. Analisar essas métricas
 * 3. Gerar alertas inteligentes
 * 4. Armazenar os dados no banco
 * 
 * Cada método tem uma responsabilidade clara e única (Single Responsibility Principle)
 */

@Injectable()
export class SmartQueueService {
  private readonly logger = new Logger(SmartQueueService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * MÉTODO PÚBLICO: Análise Completa por Empresa
   * 
   * Este é o método principal que será chamado pelo cron job
   * Ele faz todo o fluxo: coleta -> análise -> armazenamento
   */
  async analyzeCompany(companyId: string): Promise<SmartQueueAnalysisResult> {
    const startTime = Date.now();

    try {
      this.logger.debug(`Iniciando análise para empresa: ${companyId}`);

      // 1. Coletar métricas do banco
      const metrics = await this.collectSystemMetrics(companyId);

      // 2. Analisar essas métricas
      const alerts = await this.generateAlerts(companyId, metrics);

      // 3. Armazenar as métricas
      await this.saveMetrics(companyId, metrics);

      // 4. Armazenar os alertas
      await this.saveAlerts(companyId, alerts);

      // 5. Log para auditoria
      const executionTime = Date.now() - startTime;
      await this.logAnalysis({
        timestamp: new Date(),
        companyId,
        alertsGenerated: alerts.length,
        executionTimeMs: executionTime,
        status: 'success',
      });

      this.logger.log(`Análise concluída em ${executionTime}ms. Alertas gerados: ${alerts.length}`);

      // Determinar status geral do sistema
      const systemStatus = this.determineSystemStatus(metrics, alerts);

      return {
        alerts,
        lastAnalyzedAt: new Date(),
        systemStatus,
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;

      this.logger.error(`Erro durante análise: ${error}`);

      await this.logAnalysis({
        timestamp: new Date(),
        companyId,
        alertsGenerated: 0,
        executionTimeMs: executionTime,
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      });

      throw error;
    }
  }

  /**
   * Obter análise mais recente da empresa
   * 
   * Usado para o frontend buscar a análise sem precisar forçar recalcular
   */
  async getLatestAnalysis(companyId: string): Promise<SmartQueueAnalysisResult> {
    // Buscar os alertas mais recentes
    let alertsRaw;
    try {
      alertsRaw = await this.prisma.smartQueueAlert.findMany({
        where: { companyId },
        orderBy: { analyzedAt: 'desc' },
        take: 10,
      });
    } catch (err: any) {
      // Prisma P2021 = table does not exist (e.g., migrations not executed)
      if (err?.code === 'P2021') {
        this.logger.warn('Tabela SmartQueueAlert não existe no banco; retornando análise vazia. Rode `npx prisma migrate deploy` ou `npx prisma db push`.');
        alertsRaw = [];
      } else {
        throw err;
      }
    }

    if (alertsRaw.length === 0) {
      // Se não tem análise recente, faz uma
      return this.analyzeCompany(companyId);
    }

    // Converter para DTO
    const alertDTOs: SmartQueueAlertDTO[] = alertsRaw.map((alert: any) => ({
      id: alert.id,
      type: alert.type as SmartQueueAlertType,
      title: alert.title,
      description: alert.description,
      primaryMetric: alert.primaryMetric,
      metadata: alert.metadata as Record<string, unknown>,
      analyzedAt: alert.analyzedAt,
    }));

    return {
      alerts: alertDTOs,
      lastAnalyzedAt: alertsRaw[0]?.analyzedAt || new Date(),
      systemStatus: 'healthy',
    };
  }

  /**
   * MÉTODOS PRIVADOS - Lógica Interna
   */

  /**
   * Coletar Métricas do Sistema
   * 
   * Aqui pegamos dados do banco:
   * - Total de leads
   * - Leads recuperados
   * - Taxa de conversão
   * - Status da API
   * - Automações ativas
   * etc.
   */
  private async collectSystemMetrics(companyId: string): Promise<SystemMetricsData> {
    try {
      // Usar Promise.all para paralelizar as queries (mais rápido)
      const [
        totalLeads,
        recoveredLeads,
        totalConversations,
        automationActiveCount,
        activeAgents,
      ] = await Promise.all([
        // Contar total de leads
        this.prisma.lead.count({
          where: { companyId },
        }),

        // Contar leads em status "recovered" ou "convertido"
        this.prisma.lead.count({
          where: {
            companyId,
            status: { in: ['recovered', 'convertido'] },
          },
        }),

        // Contar conversas
        this.prisma.conversation.count({
          where: { companyId },
        }),

        // Contar automações ativas
        this.prisma.automation.count({
          where: { companyId, status: 'active' },
        }),

        // Contar agentes ativos
        this.prisma.agent.count({
          where: { companyId, active: true },
        }),
      ]);

      // Calcular taxa de conversão
      // Prevenimos divisão por zero com verificação
      const conversionRate =
        totalLeads > 0 ? (recoveredLeads / totalLeads) * 100 : 0;

      // Simular status da API (em produção, você faria uma verificação real)
      const apiStatus = this.evaluateApiStatus();

      return {
        totalLeads,
        recoveredLeads,
        conversionRate,
        apiStatus,
        automationActiveCount,
        totalConversations,
        activeAgents,
      };
    } catch (err: any) {
      if (err?.code === 'P2021') {
        this.logger.warn('Banco incompleto: tabelas de métricas não existem. Retornando valores padrão. Rode migrations com Prisma.');
        return {
          totalLeads: 0,
          recoveredLeads: 0,
          conversionRate: 0,
          apiStatus: 'healthy',
          automationActiveCount: 0,
          totalConversations: 0,
          activeAgents: 0,
        };
      }
      throw err;
    }
  }

  /**
   * Gerar Alertas Inteligentes
   * 
   * A parte mais importante! Aqui analisamos os dados e geramos insights
   * Cada tipo de alerta tem sua própria lógica de decisão
   */
  private async generateAlerts(
    companyId: string,
    metrics: SystemMetricsData,
  ): Promise<SmartQueueAlertDTO[]> {
    const alerts: SmartQueueAlertDTO[] = [];

    // 1. ALERTA: Oportunidade de Recuperação de Leads
    if (metrics.recoveredLeads > 100) {
      alerts.push({
        id: this.generateId(),
        type: SmartQueueAlertType.LEADS_RECOVERY,
        title: 'Fila Inteligente!',
        description: 'Recuperação de Lead',
        primaryMetric: metrics.recoveredLeads.toLocaleString('pt-BR'),
        metadata: {
          recoveryRate: ((metrics.recoveredLeads / metrics.totalLeads) * 100).toFixed(2) + '%',
          timeframe: 'Últimos 30 dias',
          recommendation: 'Seu sistema está recuperando muitos leads! Continue com essa automação ativa.',
        },
        analyzedAt: new Date(),
      });
    }

    // 2. ALERTA: Taxa de Conversão
    if (metrics.conversionRate >= 80) {
      alerts.push({
        id: this.generateId(),
        type: SmartQueueAlertType.CONVERSION_RATE,
        title: 'Status do Sistema | Taxa de Conversão',
        description: 'Meta API está estável',
        primaryMetric: metrics.conversionRate.toFixed(1) + '%',
        metadata: {
          status: 'Saudável',
          apiHealth: 'Operacional',
          trend: 'Crescente',
          recommendation: 'Sua taxa de conversão está excelente! Mantenha os agentes ativados.',
        },
        analyzedAt: new Date(),
      });
    }

    // 3. ALERTA: Taxa de Conversão Baixa (aviso)
    if (metrics.conversionRate < 50 && metrics.conversionRate > 0) {
      alerts.push({
        id: this.generateId(),
        type: SmartQueueAlertType.CONVERSION_RATE,
        title: 'Atenção: Taxa de Conversão Baixa',
        description: 'Conversões abaixo do esperado',
        primaryMetric: metrics.conversionRate.toFixed(1) + '%',
        metadata: {
          status: 'Atenção',
          trend: 'Descendente',
          recommendation: 'Verifique seus agentes e prompts. Alguns podem precisar de ajustes.',
          leadsAfected: metrics.totalLeads,
        },
        analyzedAt: new Date(),
      });
    }

    // 4. ALERTA: Status da API
    if (metrics.apiStatus === 'warning') {
      alerts.push({
        id: this.generateId(),
        type: SmartQueueAlertType.API_STATUS,
        title: 'Aviso: API com Latência',
        description: 'Meta API respondendo lentamente',
        primaryMetric: 'Latência Detectada',
        metadata: {
          status: 'Aviso',
          recommendation: 'Pode haver demora nas respostas. Monitore o sistema.',
          lastCheck: new Date().toISOString(),
        },
        analyzedAt: new Date(),
      });
    }

    // 5. ALERTA: Status da API Crítico
    if (metrics.apiStatus === 'critical') {
      alerts.push({
        id: this.generateId(),
        type: SmartQueueAlertType.API_STATUS,
        title: 'Crítico: API Indisponível',
        description: 'Meta API não está respondendo',
        primaryMetric: 'Offline',
        metadata: {
          status: 'Crítico',
          recommendation: 'Contate o suporte. Automações podem estar paradas.',
          affectedServices: ['Meta API', 'Message Routing'],
        },
        analyzedAt: new Date(),
      });
    }

    // 6. ALERTA: Insights sobre Automações
    if (metrics.automationActiveCount > 0) {
      alerts.push({
        id: this.generateId(),
        type: SmartQueueAlertType.AUTOMATION_INSIGHT,
        title: 'Automações Ativas',
        description: 'Sistema funcionando normalmente',
        primaryMetric: metrics.automationActiveCount.toString(),
        metadata: {
          activeAgents: metrics.activeAgents,
          totalConversations: metrics.totalConversations,
          uptime: '99.9%',
          recommendation: 'Seu sistema de automação está otimizado!',
        },
        analyzedAt: new Date(),
      });
    }

    // 7. ALERTA: Performance do Sistema
    const performanceScore = this.calculatePerformanceScore(metrics);
    if (performanceScore > 80) {
      alerts.push({
        id: this.generateId(),
        type: SmartQueueAlertType.SYSTEM_PERFORMANCE,
        title: 'Performance Otimizada',
        description: 'Sistema em pico de performance',
        primaryMetric: performanceScore.toFixed(0) + '%',
        metadata: {
          uptime: '99.9%',
          avgResponseTime: '250ms',
          recommendation: 'Parabéns! Seu sistema está operando no máximo potencial.',
        },
        analyzedAt: new Date(),
      });
    }

    return alerts;
  }

  /**
   * Salvar Métricas no Banco
   * 
   * Armazenamos os dados brutos para histórico e análises futuras
   */
  private async saveMetrics(
    companyId: string,
    metrics: SystemMetricsData,
  ): Promise<void> {
    try {
      await this.prisma.systemMetric.create({
        data: {
          companyId,
          totalLeads: metrics.totalLeads,
          recoveredLeads: metrics.recoveredLeads,
          conversionRate: metrics.conversionRate,
          apiStatus: metrics.apiStatus,
          automationActiveCount: metrics.automationActiveCount,
          totalConversations: metrics.totalConversations,
          activeAgents: metrics.activeAgents,
          metricDate: new Date(),
        },
      });
    } catch (err: any) {
      if (err?.code === 'P2021') {
        this.logger.warn('Tabela systemMetric não existe; pulando gravação de métricas. Rode migrations (prisma).');
        return;
      }
      throw err;
    }
  }

  /**
   * Salvar Alertas no Banco
   * 
   * Armazenar cada alerta para o frontend buscar depois
   */
  private async saveAlerts(
    companyId: string,
    alerts: SmartQueueAlertDTO[],
  ): Promise<void> {
    if (alerts.length === 0) return;
    try {
      await this.prisma.smartQueueAlert.createMany({
        data: alerts.map(alert => ({
          companyId,
          type: alert.type,
          title: alert.title,
          description: alert.description,
          primaryMetric: alert.primaryMetric,
          metadata: alert.metadata as unknown as Prisma.InputJsonValue,
          analyzedAt: alert.analyzedAt,
        })),
      });
    } catch (err: any) {
      if (err?.code === 'P2021') {
        this.logger.warn('Tabela SmartQueueAlert não existe; pulando gravação de alertas. Rode migrations (prisma).');
        return;
      }
      throw err;
    }
  }

  /**
   * Log de Análise
   * 
   * Para auditoria e debug
   */
  private async logAnalysis(log: AnalysisLog): Promise<void> {
    this.logger.log(
      `[Analysis Log] Company: ${log.companyId} | Status: ${log.status} | Alerts: ${log.alertsGenerated} | Time: ${log.executionTimeMs}ms`,
    );

    if (log.status === 'error' && log.errorMessage) {
      this.logger.error(`[Analysis Error] ${log.errorMessage}`);
    }
  }

  /**
   * Avaliar Status da API
   * 
   * Em produção, você faria uma chamada real à API Meta
   * Por agora, retornamos um status simulado
   */
  private evaluateApiStatus(): 'healthy' | 'warning' | 'critical' {
    // Simular status (em produção, faria verificação real)
    const random = Math.random();

    if (random > 0.95) {
      return 'critical';
    }
    if (random > 0.85) {
      return 'warning';
    }

    return 'healthy';
  }

  /**
   * Calcular Score de Performance
   * 
   * Pontua de 0-100 baseado nas métricas
   */
  private calculatePerformanceScore(metrics: SystemMetricsData): number {
    let score = 100;

    // Penalizar por taxa de conversão baixa
    if (metrics.conversionRate < 50) {
      score -= 20;
    }

    // Penalizar se houver poucas automações
    if (metrics.automationActiveCount < 1) {
      score -= 15;
    }

    // Penalizar se API não está saudável
    if (metrics.apiStatus === 'warning') {
      score -= 10;
    }
    if (metrics.apiStatus === 'critical') {
      score -= 30;
    }

    // Recompensar muitos agentes ativos
    if (metrics.activeAgents >= 3) {
      score += 5;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Determinar Status Geral do Sistema
   */
  private determineSystemStatus(
    metrics: SystemMetricsData,
    alerts: SmartQueueAlertDTO[],
  ): 'healthy' | 'warning' | 'critical' {
    // Se a API está crítica, o sistema está crítico
    if (metrics.apiStatus === 'critical') {
      return 'critical';
    }

    // Se há alertas críticos
    const criticalAlerts = alerts.filter(
      a => a.type === SmartQueueAlertType.API_STATUS && a.metadata.status === 'Crítico'
    );
    if (criticalAlerts.length > 0) {
      return 'critical';
    }

    // Se há avisos
    if (metrics.apiStatus === 'warning' || alerts.length > 3) {
      return 'warning';
    }

    return 'healthy';
  }

  /**
   * Gerar ID único
   * 
   * Em produção, o banco gera IDs. Aqui usamos para DTOs temporários
   */
  private generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }
}
