import { Cards } from '../entities/cards.entity';
import { CardResponseDto } from '../modules/cards/dto/cardResponse.dto';

export const cardMapper = (card: Cards): CardResponseDto => {
  return {
    id: card.id,
    name: card.name,
    ownerId: card.ownerId,
    cardType: card.cardType,
  };
};
