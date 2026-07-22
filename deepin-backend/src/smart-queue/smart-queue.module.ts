import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SmartQueueService } from './smart-queue.service';
import { SmartQueueController } from './smart-queue.controller';
import { SmartQueueScheduler } from './smart-queue.scheduler';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompanyOwnerGuard } from '../auth/company-owner.guard';
import { PrismaModule } from '../prisma/prisma.module';

/**
 * MODULE - FILA INTELIGENTE
 * 
 * Um módulo agrupa funcionalidades relacionadas em um único lugar
 * 
 * Este módulo contém:
 * - Service: Lógica de negócio
 * - Controller: Endpoints HTTP
 * - Scheduler: Tarefas agendadas (cron jobs)
 * 
 * Módulos são como "pacotes" de funcionalidade que você pode
 * reutilizar e ativar/desativar facilmente
 */

@Module({
  // Imports: módulos que este módulo precisa
  imports: [
    // ScheduleModule.forRoot() = ativa suporte a Cron Jobs
    ScheduleModule.forRoot(),

    // PrismaModule = acesso ao banco de dados
    PrismaModule,
  ],

  // Controllers: expõem endpoints HTTP
  controllers: [SmartQueueController],

  // Providers: serviços e scheduler
  providers: [SmartQueueService, SmartQueueScheduler, JwtAuthGuard, CompanyOwnerGuard],

  // Exports: o que outros módulos podem usar daqui
  // Se exportássemos, outros módulos poderiam injetar SmartQueueService
  exports: [SmartQueueService],
})
export class SmartQueueModule {}
