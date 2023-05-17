import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cards } from '../../entities/cards.entity';
import { CardState } from '../../enums/cardState.enum';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CardsRepository {
  constructor(
    @InjectRepository(Cards)
    private cardsRepository: Repository<Cards>,
  ) {}

  public async getCardBy(condition: {
    id?: number;
    ownerId?: number;
  }): Promise<Cards> {
    if (!condition.id && !condition.ownerId) {
      console.log('Description error message for the logger'); // Need to use logger instead console.log
      throw new InternalServerErrorException();
    }

    return this.cardsRepository.findOneBy(condition);
  }

  public getAllCards(): Promise<Cards[]> {
    return this.cardsRepository.find();
  }

  public createCard(createCardDto: CreateCardDto): Promise<Cards> {
    return this.cardsRepository.create(createCardDto).save();
  }

  public async updateCard(
    id: Cards['id'],
    updateCardDto: UpdateCardDto,
  ): Promise<void> {
    await this.cardsRepository.update(id, updateCardDto);
  }

  public async deleteUser(id: Cards['id']): Promise<void> {
    await this.cardsRepository.update(id, { cardState: CardState.DELETED });
    await this.cardsRepository.softDelete(id);
  }
}
