/**
 * TIPOS DA FILA INTELIGENTE
 * 
 * Este arquivo contém todos os tipos e interfaces que usamos
 * na Fila Inteligente. Isso garante que o TypeScript valide
 * tudo e evita erros em tempo de execução.
 * 
 * Tipos bem definidos = código seguro e previsível ✅
 */

/**
 * Enum com os tipos de alertas possíveis
 * Cada tipo representa um tipo de análise que fazemos
 */
export enum SmartQueueAlertType {
  // Lead Recovery - Oferece oportunidades de recuperação
  LEADS_RECOVERY = 'leads_recovery',

  // Conversion Rate - Taxa de conversão do sistema
  CONVERSION_RATE = 'conversion_rate',

  // API Status - Saúde da API Meta
  API_STATUS = 'api_status',

  // Automation Insight - Insights sobre automações
  AUTOMATION_INSIGHT = 'automation_insight',

  // System Performance - Performance geral
  SYSTEM_PERFORMANCE = 'system_performance',
}

/**
 * Interface para o alerta que será exibido
 * Isso é o que o frontend recebe
 */
export interface SmartQueueAlertDTO {
  id: string;
  type: SmartQueueAlertType;
  title: string;
  description: string;
  primaryMetric: string;
  metadata: Record<string, unknown>;
  analyzedAt: Date;
}

/**
 * Interface para os dados brutos do sistema
 * Esses são os dados que coletamos para fazer análises
 */
export interface SystemMetricsData {
  totalLeads: number;
  recoveredLeads: number;
  conversionRate: number;
  apiStatus: 'healthy' | 'warning' | 'critical';
  automationActiveCount: number;
  totalConversations: number;
  activeAgents: number;
}

/**
 * Interface para o resultado da análise inteligente
 * O que retornamos ao frontend
 */
export interface SmartQueueAnalysisResult {
  alerts: SmartQueueAlertDTO[];
  lastAnalyzedAt: Date;
  systemStatus: 'healthy' | 'warning' | 'critical';
}

/**
 * Interface para request de análise manual
 * Caso o frontend queira forçar uma análise
 */
export interface TriggerAnalysisRequest {
  companyId: string;
}

/**
 * Interface para log de análise
 * Usamos para debug e auditoria
 */
export interface AnalysisLog {
  timestamp: Date;
  companyId: string;
  alertsGenerated: number;
  executionTimeMs: number;
  status: 'success' | 'error';
  errorMessage?: string;
}
