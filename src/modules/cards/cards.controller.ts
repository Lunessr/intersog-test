import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { cardMapper } from '../../mappers/card.mapper';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';
import { Cards } from '../../entities/cards.entity';
import { CARD_DELETED } from '../../constants/messages';
import { CardResponseDto } from './dto/cardResponse.dto';
import { NO_CARD } from '../../constants/errors';
import { CardState } from '../../enums/cardState.enum';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get(':id')
  public async getCard(@Param('id') id: number): Promise<CardResponseDto> {
    const card = await this.cardsService.getCardById(id);
    if (card === null || card.cardState === CardState.DELETED) {
      throw new NotFoundException(NO_CARD);
    }

    return cardMapper(card);
  }

  @Get()
  public async getAllCards(): Promise<CardResponseDto[]> {
    const cards = await this.cardsService.getAllCards();

    return cards.map((card) => cardMapper(card));
  }

  @Post()
  public async createCard(
    @Body() createCardDto: CreateCardDto,
  ): Promise<CardResponseDto> {
    const createdCard = await this.cardsService.createCard(createCardDto);

    return cardMapper(createdCard);
  }

  @Patch(':id')
  public async updateCard(
    @Param('id') id: Cards['id'],
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<CardResponseDto> {
    const card = await this.cardsService.getCardById(id);
    if (card === null || card.cardState === CardState.DELETED) {
      throw new NotFoundException(NO_CARD);
    }

    const updatedCard = await this.cardsService.updateCard(id, updateCardDto);

    return cardMapper(updatedCard);
  }

  @Delete(':id')
  public async deleteCard(@Param('id') id: Cards['id']): Promise<string> {
    const card = await this.cardsService.getCardById(id);
    if (card === null || card.cardState === CardState.DELETED) {
      throw new NotFoundException(NO_CARD);
    }

    await this.cardsService.deleteCard(id);

    return CARD_DELETED;
  }
}
