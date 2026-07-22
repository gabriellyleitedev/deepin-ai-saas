import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrismaModule } from './prisma/prisma.module';
import { SmartQueueModule } from './smart-queue/smart-queue.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), DashboardModule, PrismaModule, SmartQueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 