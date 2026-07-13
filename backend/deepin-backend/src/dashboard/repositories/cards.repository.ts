import { Injectable } from '@nestjs/common';
import { DashboardCard } from '../models/dashboard.model';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<DashboardCard[]> {

  const totalAgents = await this.prisma.agent.count({
    where: {
      active: true,
    },
  });

  const totalLeads = await this.prisma.lead.count();

  const totalExecutions = await this.prisma.conversation.aggregate({
    _sum: {
      messages: true,
    },
  });

  const averageEconomy = 8; // mock por enquanto

  const totalMessages = totalExecutions._sum.messages ?? 0;

  return [
    {
      title: "Agentes",
      value: totalAgents,
      trend: "ativos",
    },
    {
      title: "Leads Captados",
      value: totalLeads,
      trend: "Captados",
    },
    {
      title: "Execuções",
      value: totalMessages,
      trend: "hoje",
    },
    {
      title: "Economia",
      value: averageEconomy,
      trend: "Em média",
    },
  ];
}
}