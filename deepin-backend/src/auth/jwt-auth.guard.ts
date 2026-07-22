import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/**
 * GUARD - AUTENTICAÇÃO JWT
 * 
 * Protetor de rota NestJS que verifica autenticação
 * 
 * Uso em controller:
 * @UseGuards(JwtAuthGuard)
 * @Get(':companyId')
 * async getAnalysis(@Req() req) {
 *   // req.user.userId, req.user.companyId, etc
 * }
 */

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Token JWT não fornecido. Use: Authorization: Bearer <token>');
    }

    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET não configurado no servidor');
      }

      const decoded = jwt.verify(token, secret);
      request.user = decoded;
      return true;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token JWT expirado');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Token JWT inválido');
      }
      throw new UnauthorizedException('Erro ao verificar autenticação');
    }
  }

  /**
   * Extrai token do header Authorization: Bearer <token>
   */
  private extractToken(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1];
  }
}
