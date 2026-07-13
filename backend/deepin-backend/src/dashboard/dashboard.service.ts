import { Injectable } from '@nestjs/common';
import { Dashboard } from './models/dashboard.model';
import { CardsService } from './services/cards.service';
import { ChartService } from './services/chart.service';
import { QueueService } from './services/queue.service';
import { GlobeService } from './services/globe.service';
import { RecentLeadsService } from './services/recent-leads.service';

@Injectable()
export class DashboardService {
    constructor(
        private readonly cardsService: CardsService,
        private readonly chartService: ChartService,
        private readonly queueService: QueueService,
        private readonly globeService: GlobeService,
        private readonly recentLeadsService: RecentLeadsService,
    ) {}

    async getDashboard(): Promise<Dashboard> {
        // O chartService agora retorna um objeto com data, summary e insights
        const chartData = await this.chartService.getWeeklyChart();

           return {
    cards: await this.cardsService.getCards(),
            weeklyChart: chartData.data,          // array de WeeklyChartData
            // Você pode querer adicionar no model Dashboard os campos summary e insights
            // Por enquanto, mantemos compatibilidade, mas você pode estender o model.
            // Se quiser, pode criar campos adicionais no model Dashboard.
            // Exemplo: 
            // chartSummary: chartData.summary,
            // chartInsights: chartData.insights,
    smartQueue: await this.queueService.getQueue(),
    recentLeads: await this.recentLeadsService.getRecentLeads(),
    globeAssistant: await this.globeService.getAssistant(),
        };
    }
}