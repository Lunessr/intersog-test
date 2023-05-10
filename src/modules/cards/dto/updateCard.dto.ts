import {
  IsString,
  IsNumber,
  IsEnum,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { CardType } from '../../../enums/cardType.enum';

export class UpdateCardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  @IsNotEmpty()
  @IsEnum(CardType)
  cardType: CardType;
}
