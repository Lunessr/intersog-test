import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { CardType } from '../../../enums/cardType';

export class UpdateCardDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  ownerId: number;

  @IsOptional()
  @IsEnum(CardType)
  cardType: CardType;
}
