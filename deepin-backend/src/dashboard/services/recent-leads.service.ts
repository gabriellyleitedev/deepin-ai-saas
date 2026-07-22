import { Injectable } from '@nestjs/common';

@Injectable() 
export class RecentLeadsService {
    getRecentLeads() {
        return [

              {
        id: '1',
        name: 'João Silva',
        phone: '(11)99999-9999',
        origin: 'WhatsApp',
        status: 'Novo',
        createdAt: new Date()
    },

    {
        id: '2',
        name: 'Maria Oliveira',
        phone: '(11)98888-8888',
        origin: 'Instagram',
        status: 'Em atendimento',
        createdAt: new Date()
    }

        ];
    }
}