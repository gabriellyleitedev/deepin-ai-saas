import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { SmartQueueService } from './smart-queue.service';

@Injectable()
export class SmartQueueScheduler {
  private readonly logger = new Logger(SmartQueueScheduler.name);

  constructor(
    private readonly smartQueueService: SmartQueueService,
    private readonly prisma: PrismaService,
  ) {}

  // Executa todos os dias às 8:00 AM (UTC)
  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async runDailyAnalysis(): Promise<void> {
    this.logger.log('🔄 Iniciando análise diária da Fila Inteligente...');

    try {
      const companies = await this.prisma.company.findMany({ where: { active: true } });

      this.logger.log(`Analisando ${companies.length} empresa(s)...`);

      for (const company of companies) {
        try {
          await this.smartQueueService.analyzeCompany(company.id);
          this.logger.log(`✅ Análise concluída para: ${company.name}`);
        } catch (err) {
          this.logger.error(`❌ Erro ao analisar ${company.name}: ${err}`);
        }
      }

      this.logger.log('✨ Análise diária concluída!');
    } catch (err) {
      this.logger.error(`Erro crítico no scheduler: ${err}`);
    }
  }

  // Remove alertas com mais de 30 dias todo domingo à meia-noite
  @Cron('0 0 * * 0')
  async cleanupOldAlerts(): Promise<void> {
    this.logger.log('🧹 Limpando alertas antigos...');

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
      const deleted = await this.prisma.smartQueueAlert.deleteMany({
        where: {
          createdAt: {
            lt: thirtyDaysAgo,
          },
        },
      });

      const count = typeof deleted === 'number' ? deleted : (deleted as any).count ?? 0;
      this.logger.log(`✅ ${count} alertas antigos removidos`);
    } catch (err) {
      this.logger.error(`Erro ao limpar alertas: ${err}`);
    }
  }
}