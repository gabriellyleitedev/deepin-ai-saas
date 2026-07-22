import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface HourlyChartRow {
  hour_label: string;
  captured: number;
  lost: number;
}

export interface DailyChartRow {
  day_label: string; // ex: '2026-07-06'
  captured: number;
  lost: number;
}

@Injectable()
export class ChartRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Mantém o método existente para 24h (se ainda for útil)
  async get24hChartData(): Promise<HourlyChartRow[]> {
    return this.prisma.$queryRaw<HourlyChartRow[]>`
      SELECT 
        TO_CHAR(series.hour, 'HH24"h"') AS "hour_label",
        COALESCE(COUNT(CASE WHEN l."status" = 'CAPTURED' THEN 1 END)::int, 0) AS "captured",
        COALESCE(COUNT(CASE WHEN l."status" = 'LOST' THEN 1 END)::int, 0) AS "lost"
      FROM (
        SELECT generate_series(
          DATE_TRUNC('hour', NOW()) - INTERVAL '23 hours',
          DATE_TRUNC('hour', NOW()),
          INTERVAL '1 hour'
        ) AS hour
      ) series
      LEFT JOIN "Lead" l 
        ON DATE_TRUNC('hour', l."createdAt") = series.hour
      GROUP BY series.hour
      ORDER BY series.hour ASC;
    `;
  }

  // NOVO: dados dos últimos 7 dias (agregados por dia)
  async getLast7DaysChartData(): Promise<DailyChartRow[]> {
    return this.prisma.$queryRaw<DailyChartRow[]>`
      SELECT 
        TO_CHAR(series.day, 'YYYY-MM-DD') AS "day_label",
        COALESCE(COUNT(CASE WHEN l."status" = 'CAPTURED' THEN 1 END)::int, 0) AS "captured",
        COALESCE(COUNT(CASE WHEN l."status" = 'LOST' THEN 1 END)::int, 0) AS "lost"
      FROM (
        SELECT generate_series(
          DATE_TRUNC('day', NOW()) - INTERVAL '6 days',
          DATE_TRUNC('day', NOW()),
          INTERVAL '1 day'
        ) AS day
      ) series
      LEFT JOIN "Lead" l 
        ON DATE_TRUNC('day', l."createdAt") = series.day
      GROUP BY series.day
      ORDER BY series.day ASC;
    `;
  }

  async countLeadsByStatusInPeriod(status: 'CAPTURED' | 'LOST', startHoursAgo: number, endHoursAgo: number): Promise<number> {
    return this.prisma.lead.count({
      where: {
        status,
        createdAt: {
          gte: new Date(Date.now() - startHoursAgo * 60 * 60 * 1000),
          lt: new Date(Date.now() - endHoursAgo * 60 * 60 * 1000),
        },
      },
    });
  }
}