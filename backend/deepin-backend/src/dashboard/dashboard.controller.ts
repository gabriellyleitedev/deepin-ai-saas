import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './models/dashboard.model';

@Controller('dashboard')
export class DashboardController {
   constructor(private readonly dashboardService: DashboardService) {}
    @Get()
     async getDashboard(): Promise<Dashboard> {
        return await this.dashboardService.getDashboard();
     }
}
