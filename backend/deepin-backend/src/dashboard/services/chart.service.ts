import { Injectable } from '@nestjs/common';
import { ChartRepository, DailyChartRow } from '../repositories/chart.repository';

export interface WeeklyChartData {
  day: string;           // nome do dia da semana, ex: 'Segunda'
  leadsCaptured: number;
  leadsLost: number;
}

export interface WeeklyChartSummary {
  totalCaptured: number;
  totalLost: number;
  conversionRate: number; // % de capturados em relação ao total (capturados + perdidos)
  averageDailyCaptured: number;
  bestDay: string;        // dia com maior captura
  worstDay: string;       // dia com menor captura
  trend: 'up' | 'down' | 'stable'; // tendência geral baseada nos últimos 7 dias
  trendPercentage: number; // variação percentual (captura) do último dia em relação ao primeiro
}

export interface Insight {
  type: 'insight' | 'alert' | 'recommendation';
  message: string;
  severity?: 'low' | 'medium' | 'high';
}

@Injectable()
export class ChartService {
  constructor(private readonly chartRepository: ChartRepository) {}

  async getWeeklyChart(): Promise<{
    data: WeeklyChartData[];
    summary: WeeklyChartSummary;
    insights: Insight[];
  }> {
    // Busca dados brutos dos últimos 7 dias
    const dbData: DailyChartRow[] = await this.chartRepository.getLast7DaysChartData();

    // Mapeia para o formato esperado pelo front (com nomes dos dias da semana)
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    // A data atual é referência para obter o dia da semana
    const today = new Date();
    const todayDayIndex = today.getDay(); // 0=domingo, 6=sábado

    // Preenche os dados para os 7 dias (garantindo ordem cronológica)
    const weeklyData: WeeklyChartData[] = dbData.map((row, index) => {
      // Obtém o dia da semana correspondente à data do registro
      const dateObj = new Date(row.day_label + 'T00:00:00'); // converte 'YYYY-MM-DD' para Date
      const dayIndex = dateObj.getDay();
      const dayName = daysOfWeek[dayIndex];
      return {
        day: dayName,
        leadsCaptured: row.captured,
        leadsLost: row.lost,
      };
    });

    // Se por algum motivo o banco não retornar 7 dias (ex: sistema novo), preenchemos com zeros
    while (weeklyData.length < 7) {
      // Adiciona dias faltantes no início (mais antigos)
      const missingDayIndex = (todayDayIndex - (7 - weeklyData.length) + 7) % 7;
      weeklyData.unshift({
        day: daysOfWeek[missingDayIndex],
        leadsCaptured: 0,
        leadsLost: 0,
      });
    }

    // Cálculo de métricas
    const totalCaptured = weeklyData.reduce((sum, d) => sum + d.leadsCaptured, 0);
    const totalLost = weeklyData.reduce((sum, d) => sum + d.leadsLost, 0);
    const conversionRate = totalCaptured + totalLost > 0 
      ? parseFloat(((totalCaptured / (totalCaptured + totalLost)) * 100).toFixed(1))
      : 0;
    const averageDailyCaptured = parseFloat((totalCaptured / 7).toFixed(1));

    // Melhor e pior dia (baseado em captura)
    let bestDay = weeklyData[0]?.day || '';
    let worstDay = weeklyData[0]?.day || '';
    let maxCaptured = -1;
    let minCaptured = Infinity;
    for (const d of weeklyData) {
      if (d.leadsCaptured > maxCaptured) {
        maxCaptured = d.leadsCaptured;
        bestDay = d.day;
      }
      if (d.leadsCaptured < minCaptured) {
        minCaptured = d.leadsCaptured;
        worstDay = d.day;
      }
    }

    // Tendência: comparar primeiro dia com último dia (captura)
    const firstDayCaptured = weeklyData[0]?.leadsCaptured || 0;
    const lastDayCaptured = weeklyData[weeklyData.length - 1]?.leadsCaptured || 0;
    let trend: 'up' | 'down' | 'stable';
    let trendPercentage = 0;
    if (firstDayCaptured > 0) {
      trendPercentage = parseFloat((((lastDayCaptured - firstDayCaptured) / firstDayCaptured) * 100).toFixed(1));
      if (trendPercentage > 5) trend = 'up';
      else if (trendPercentage < -5) trend = 'down';
      else trend = 'stable';
    } else {
      // Se primeiro dia zero, mas último > 0 => up
      trend = lastDayCaptured > 0 ? 'up' : 'stable';
      trendPercentage = lastDayCaptured > 0 ? 100 : 0;
    }

    const summary: WeeklyChartSummary = {
      totalCaptured,
      totalLost,
      conversionRate,
      averageDailyCaptured,
      bestDay,
      worstDay,
      trend,
      trendPercentage,
    };

    // --- Geração de Insights e Recomendações ---
    const insights: Insight[] = [];

    // 1. Insight sobre melhor dia
    if (maxCaptured > averageDailyCaptured * 1.3) {
      insights.push({
        type: 'insight',
        message: `O melhor dia para captura foi ${bestDay}, com ${maxCaptured} leads, ${((maxCaptured / averageDailyCaptured - 1) * 100).toFixed(0)}% acima da média diária.`,
        severity: 'medium',
      });
    }

    // 2. Insight sobre pior dia
    if (minCaptured < averageDailyCaptured * 0.7 && minCaptured >= 0) {
      insights.push({
        type: 'alert',
        message: `Atenção: ${worstDay} teve apenas ${minCaptured} leads, bem abaixo da média (${averageDailyCaptured}).`,
        severity: 'high',
      });
    }

    // 3. Tendência
    if (trend === 'up') {
      insights.push({
        type: 'recommendation',
        message: `Capturas estão em alta (${trendPercentage}% comparado ao início da semana). Continue investindo nas campanhas atuais.`,
        severity: 'low',
      });
    } else if (trend === 'down') {
      insights.push({
        type: 'alert',
        message: `As capturas caíram ${Math.abs(trendPercentage)}% ao longo da semana. Reveja as estratégias de aquisição.`,
        severity: 'high',
      });
    } else {
      insights.push({
        type: 'insight',
        message: `Capturas estão estáveis. Considere testar novos canais para impulsionar o crescimento.`,
        severity: 'low',
      });
    }

    // 4. Recomendação baseada em taxa de conversão
    if (conversionRate < 40) {
      insights.push({
        type: 'recommendation',
        message: `Taxa de conversão está baixa (${conversionRate}%). Avalie a qualidade dos leads ou o processo de qualificação.`,
        severity: 'high',
      });
    } else if (conversionRate > 70) {
      insights.push({
        type: 'insight',
        message: `Excelente taxa de conversão (${conversionRate}%). Continue com as mesmas práticas.`,
        severity: 'low',
      });
    }

    // 5. Comparação com dias anteriores (se houver dados históricos poderíamos incluir)
    // Por enquanto, uma dica genérica se algum dia tiver perda muito alta
    const dayWithHighLost = weeklyData.find(d => d.leadsLost > d.leadsCaptured * 0.8);
    if (dayWithHighLost) {
      insights.push({
        type: 'recommendation',
        message: `Em ${dayWithHighLost.day}, as perdas foram altas (${dayWithHighLost.leadsLost} perdidos). Verifique se há problemas no atendimento.`,
        severity: 'medium',
      });
    }

    return {
      data: weeklyData,
      summary,
      insights,
    };
  }
}