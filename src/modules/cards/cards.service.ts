import { BadRequestException, Injectable } from '@nestjs/common';
import { Cards } from '../../entities/cards.entity';
import { CardsRepository } from './cards.repository';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';

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

    await this.checkExistingCard(
      ownerId,
      'This owner ID is associated with an existing card',
    );

    return this.cardsRepository.createCard(createCardDto);
  }
  public async updateCard(
    id: Cards['id'],
    updateCardDto: UpdateCardDto,
  ): Promise<Cards> {
    const card = await this.getCardById(id);
    if (!card) {
      throw new BadRequestException('No card exists with this ID');
    }

    await this.cardsRepository.updateCard(id, updateCardDto);

    return this.getCardById(id);
  }

  public async deleteCard(id: Cards['id']): Promise<void> {
    await this.cardsRepository.deleteUser(id);
  }

  private async checkExistingCard(
    ownerId: Cards['ownerId'],
    errorMessage: string,
  ): Promise<void> {
    const existUser = await this.cardsRepository.getCardBy({ ownerId });

    if (existUser) {
      throw new BadRequestException(errorMessage);
    }
  }
}
