import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { CardsService } from './services/cards.service';
import { ChartService } from './services/chart.service';
import { QueueService } from './services/queue.service';
import { GlobeService } from './services/globe.service';
import { RecentLeadsService } from './services/recent-leads.service';
import { CardsRepository } from './repositories/cards.repository';
import { ChartRepository } from './repositories/chart.repository'; // Importe o ChartRepository
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DashboardController],
  providers: [
    DashboardService,
    CardsService,
    ChartService,
    QueueService,
    GlobeService,
    RecentLeadsService,
    CardsRepository,
    ChartRepository,   // <-- Adicione aqui
    PrismaService
  ],
})
export class DashboardModule {}