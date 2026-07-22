import { Injectable  } from '@nestjs/common';
import { CardsRepository } from '../repositories/cards.repository';

@Injectable()
export class CardsService {

    constructor(private readonly cardsRepository: CardsRepository) {}

    async getCards() {
        return await this.cardsRepository.findAll();
    }
    
}