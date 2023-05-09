import { CardType } from '../../../enums/cardType';

export class CardResponseDto {
  id: number;

  name: string;

  ownerId: number;

  cardType: CardType;
}
