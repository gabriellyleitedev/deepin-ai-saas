import { Request, Response } from 'express';

/**
 * GET /api/dashboard/overview
 * 
 * Retorna as MÉTRICAS principais para o dashboard
 * DADOS MOCKADOS TEMPORARIAMENTE - enquanto Prisma é gerado
 */
export const getOverview = async (req: Request, res: Response): Promise<any> => {
  try {
    // ============================================
    // RESPOSTA COM DADOS MOCKADOS (estrutura final)
    // ============================================
    return res.json({
      success: true,
      data: {
        metrics: {
          totalMessages: 1320,
          totalAudioMessages: 821,
          conversionRate: 98.2,
          systemHealth: 98.4
        },
        leads: {
          counts: {
            novo: 12,
            triagem: 4,
            altoInteresse: 2,
            agendado: 0,
            finalizado: 0
          },
          total: 18
        },
        automations: {
          counts: {
            ativa: 123,
            pausada: 2,
            erro: 1
          },
          healthPercentage: 98.0
        },
        recentLeads: [
          { id: '1', name: 'João Silva', email: 'joao@example.com', status: 'novo', createdAt: new Date() },
          { id: '2', name: 'Maria Santos', email: 'maria@example.com', status: 'triagem', createdAt: new Date() }
        ]
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard overview'
    });
  }
};
