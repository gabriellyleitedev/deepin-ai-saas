import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './models/dashboard.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * CONTROLLER - DASHBOARD
 * 
 * Endpoints para obter dados do dashboard
 * 
 * SEGURANÇA:
 * ✅ @UseGuards(JwtAuthGuard) protege todos os endpoints
 * ✅ Requer JWT válido para acessar
 */

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * GET /dashboard
   * 
   * Obter todos os dados do dashboard
   * 
   * Requer autenticação JWT
   */
  @Get()
  async getDashboard(@Req() req: any): Promise<Dashboard> {
    // O usuário está autenticado (verificado pelo JwtAuthGuard)
    // Você pode usar req.user.userId ou req.user.companyId se precisar
    return await this.dashboardService.getDashboard();
  }
}
