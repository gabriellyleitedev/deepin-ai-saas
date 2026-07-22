// aqui é a lista de tarefas que o dashboard vai mostrar, como por exemplo: total de usuários, total de vendas, etc.
export interface DashboardCard {
    title: string;
    value: number;
    trend: string;
}

export interface WeeklyChartData {
    day: string;
    leadsCaptured: number;
    leadsLost: number;
}

export interface SmartQueueAlert {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface RecentLead {
    id: string;
    name: string;
    phone: string;
    origin: string;
    status: string;
    createdAt: Date;
}

export interface GlobeAssistant {
    status: string;
    message: string;
}

export interface Dashboard {
    cards: DashboardCard[];
    weeklyChart: WeeklyChartData[];
    smartQueue: SmartQueueAlert[];
    recentLeads: RecentLead[];
    globeAssistant: GlobeAssistant;
}