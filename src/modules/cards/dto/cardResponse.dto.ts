import { CardType } from '../../../enums/cardType.enum';

export class CardResponseDto {
  id: number;

  name: string;

  ownerId: number;

  cardType: CardType;
}
