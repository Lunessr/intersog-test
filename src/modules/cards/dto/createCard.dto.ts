import { IsString, IsNumber, IsEnum } from 'class-validator';
import { CardType } from '../../../enums/cardType';

export class CreateCardDto {
  @IsString()
  name: string;

  @IsNumber()
  ownerId: number;

  @IsEnum(CardType)
  cardType: CardType;
}
