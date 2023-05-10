import { BadRequestException, Injectable } from '@nestjs/common';
import { Cards } from '../../entities/cards.entity';
import { CardsRepository } from './cards.repository';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';
import { CARD_EXIST } from '../../constants/errors';

@Injectable()
export class CardsService {
  constructor(private cardsRepository: CardsRepository) {}

  public getCardById(id: Cards['id']): Promise<Cards> {
    return this.cardsRepository.getCardBy({ id });
  }

  public getAllCards(): Promise<Cards[]> {
    return this.cardsRepository.getAllCards();
  }

  public async createCard(createCardDto: CreateCardDto): Promise<Cards> {
    const { ownerId } = createCardDto;

    await this.checkExistingCard(ownerId);

    return this.cardsRepository.createCard(createCardDto);
  }
  public async updateCard(
    id: Cards['id'],
    updateCardDto: UpdateCardDto,
  ): Promise<Cards> {
    await this.cardsRepository.updateCard(id, updateCardDto);

    return this.getCardById(id);
  }

  public async deleteCard(id: Cards['id']): Promise<void> {
    await this.cardsRepository.deleteUser(id);
  }

  private async checkExistingCard(ownerId: Cards['ownerId']): Promise<void> {
    const existCard = await this.cardsRepository.getCardBy({ ownerId });

    if (existCard !== null) {
      throw new BadRequestException(CARD_EXIST);
    }
  }
}
