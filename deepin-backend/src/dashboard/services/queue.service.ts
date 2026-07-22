import { Injectable } from '@nestjs/common';
import { SmartQueueAlert } from '../models/dashboard.model';

@Injectable()
export class QueueService {


    async getQueue(): Promise<SmartQueueAlert[]> { // Promise é uma promessa de que a função vai retornar um array de SmartQueueAlert. "Uma promessa de que, futuramente, eu vou entregar um SmartQueueAlert[]."

        return [
            {
                title: 'Lead aguardando resposta',
                description: 'João Silva está esperando há 15 minutos.',
                priority: 'high',
            },
            {
                title: 'Mensagem não entregue',
                description: 'Falha ao enviar mensagem para Maria.',
                priority: 'medium',
            },
        ];
    }
}