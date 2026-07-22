import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * GUARD - VERIFICAÇÃO DE COMPANHIA
 * 
 * Garante que o usuário só pode acessar dados da sua própria empresa
 * 
 * Uso:
 * @UseGuards(JwtAuthGuard, CompanyOwnerGuard)
 * @Get(':companyId')
 * async getAnalysis(
 *   @Param('companyId') companyId: string,
 *   @Req() req
 * ) {
 *   // req.user.companyId === companyId (garantido pelo guard)
 * }
 */

@Injectable()
export class CompanyOwnerGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { companyId } = request.params;
    const user = request.user;

    if (!user || !user.userId) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    if (!companyId) {
      throw new ForbiddenException('companyId não fornecido');
    }

    // Buscar o usuário para obter sua empresa
    const userRecord = await this.prisma.user.findUnique({
      where: { id: user.userId },
      select: { companyId: true },
    });

    if (!userRecord) {
      throw new ForbiddenException('Usuário não encontrado');
    }

    // Verificar se a empresa do usuário corresponde à empresa solicitada
    if (userRecord.companyId !== companyId) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar dados dessa empresa'
      );
    }

    return true;
  }
}
