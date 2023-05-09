import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Response,
} from '@nestjs/common';
import { cardMapper } from '../../mappers/cardMapper';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get(':user_id')
  public async getCard(@Param('id') id: number, @Response() res) {
    const card = await this.cardsService.getCardById(id);

    return res.status(HttpStatus.OK).json(cardMapper(card));
  }

  @Get()
  public async getAllCards(@Response() res) {
    const cards = await this.cardsService.getAllCards();

    return res
      .status(HttpStatus.OK)
      .json(cards.map((card) => cardMapper(card)));
  }

  @Post()
  public async createCard(
    @Body() createCardDto: CreateCardDto,
    @Response() res,
  ) {
    const createdCard = await this.cardsService.createCard(createCardDto);

    return res.status(HttpStatus.OK).json(cardMapper(createdCard));
  }

  @Patch(':id')
  public async updateCard(
    @Param('id') id,
    @Body() updateCardDto: UpdateCardDto,
    @Response() res,
  ) {
    const updatedCard = await this.cardsService.updateCard(id, updateCardDto);

    return res.status(HttpStatus.OK).json(cardMapper(updatedCard));
  }
}
