import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CARDS_REPOSITORY } from '../../constants/providers';
import { Cards } from '../../entities/cards.entity';
import { CardState } from '../../enums/cardState';
import { CreateCardDto } from './dto/createCard.dto';

@Injectable()
export class CardsRepository {
  constructor(
    @Inject(CARDS_REPOSITORY)
    private cardsRepository: Repository<Cards>,
  ) {}

  public async getCardBy(conditions): Promise<Cards> {
    const card = await this.cardsRepository.findOne(conditions);
    console.log(card);
    return card;
  }

  public getAllCards(): Promise<Cards[]> {
    return this.cardsRepository.find();
  }

  public createCard(createCardDto: CreateCardDto): Promise<Cards> {
    const { name, ownerId, cardType } = createCardDto;
    return this.cardsRepository.create({ name, ownerId, cardType }).save();
  }

  public async updateCard(
    id: Cards['id'],
    conditions: QueryDeepPartialEntity<Cards>,
  ): Promise<void> {
    await this.cardsRepository.update(id, conditions);
  }

  public async deleteUser(id: Cards['id']): Promise<void> {
    await this.cardsRepository.update(id, { cardState: CardState.DELETED });
    await this.cardsRepository.softDelete(id);
  }
}
