import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

/**
 * MIDDLEWARE - AUTENTICAÇÃO JWT
 * 
 * Verifica se o token JWT é válido e extrai informações do usuário
 * 
 * Uso:
 * @UseGuards(AuthGuard)
 * async myMethod(@Req() req: AuthenticatedRequest) {
 *   const userId = req.user.userId;
 *   const companyId = req.user.companyId;
 * }
 */

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    companyId?: string;
  };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = this.extractToken(req);

    if (!token) {
      throw new UnauthorizedException('Token JWT não fornecido');
    }

    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET não configurado');
      }

      const decoded = jwt.verify(token, secret);
      req.user = decoded as any;
      next();
    } catch (error) {
      throw new UnauthorizedException('Token JWT inválido ou expirado');
    }
  }

  /**
   * Extrai token do header Authorization: Bearer <token>
   */
  private extractToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1];
  }
}
