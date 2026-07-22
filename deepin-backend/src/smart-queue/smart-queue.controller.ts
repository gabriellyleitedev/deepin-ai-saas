import { Controller, Get, Post, Param, UseGuards, Req, HttpCode, HttpStatus, Headers, UnauthorizedException } from '@nestjs/common';
import { SmartQueueService } from './smart-queue.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompanyOwnerGuard } from '../auth/company-owner.guard';
import {
  SmartQueueAnalysisResult,
  TriggerAnalysisRequest,
} from './types/smart-queue.types';

/**
 * CONTROLLER - FILA INTELIGENTE
 * 
 * Este controller expõe os endpoints HTTP que o frontend vai usar
 * 
 * Responsabilidades:
 * 1. Validar requests
 * 2. Chamar o service
 * 3. Retornar respostas formatadas
 * 4. Lidar com erros HTTP
 * 
 * SEGURANÇA:
 * ✅ @UseGuards(JwtAuthGuard, CompanyOwnerGuard) protege todos os endpoints
 * ✅ Verifica autenticação do usuário
 * ✅ Verifica se usuário tem acesso à empresa solicitada
 */

@Controller('api/smart-queue')
export class SmartQueueController {
  constructor(private readonly smartQueueService: SmartQueueService) {}

  /**
   * GET /api/smart-queue/:companyId
   * 
   * Obter a análise mais recente da fila inteligente
   * 
   * SEGURANÇA:
   * ✅ Requer JWT válido
   * ✅ Verifica se usuário é da empresa
   * 
   * Exemplo de uso no frontend:
   * ```javascript
   * const response = await fetch('/api/smart-queue/company-123', {
   *   headers: {
   *     'Authorization': 'Bearer ' + token
   *   }
   * });
   * const data = await response.json();
   * console.log(data.alerts); // Array de alertas
   * ```
   */
  @Get(':companyId')
  @UseGuards(JwtAuthGuard, CompanyOwnerGuard)
  async getLatestAnalysis(
    @Param('companyId') companyId: string,
    @Req() req: any,
    @Headers('x-api-key') apiKey?: string,
  ): Promise<SmartQueueAnalysisResult> {
    const expected = process.env.SMART_QUEUE_API_KEY;
    if (!expected || apiKey !== expected) {
      throw new UnauthorizedException('Invalid API key for Smart Queue');
    }

    return this.smartQueueService.getLatestAnalysis(companyId);
  }

  /**
   * POST /api/smart-queue/analyze/:companyId
   * 
   * Forçar uma análise imediata (por exemplo, quando usuário clica um botão "Atualizar")
   * 
   * SEGURANÇA:
   * ✅ Requer JWT válido
   * ✅ Verifica se usuário é da empresa
   * 
   * Exemplo de uso:
   * ```javascript
   * const response = await fetch('/api/smart-queue/analyze/company-123', {
   *   method: 'POST',
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': 'Bearer ' + token
   *   }
   * });
   * ```
   */
  @Post('analyze/:companyId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, CompanyOwnerGuard)
  async triggerAnalysis(
    @Param('companyId') companyId: string,
    @Req() req: any,
    @Headers('x-api-key') apiKey?: string,
  ): Promise<SmartQueueAnalysisResult> {
    const expected = process.env.SMART_QUEUE_API_KEY;
    if (!expected || apiKey !== expected) {
      throw new UnauthorizedException('Invalid API key for Smart Queue');
    }

    return this.smartQueueService.analyzeCompany(companyId);
  }
}
