import { Injectable } from '@nestjs/common';

@Injectable() 
export class GlobeService {
        getAssistant() {

        return {
            status: 'online',
            message: 'Tudo funcionando normalmente.'
        };

    }
}