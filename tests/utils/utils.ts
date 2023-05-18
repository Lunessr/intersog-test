import { CardType } from '../../src/enums/cardType.enum';

export function randomOwnerId() {
  let ownerId = '';
  for (let i = 0; i < 5; i++) {
    ownerId += Math.floor(Math.random() * 9);
  }

  return Number(ownerId);
}

export function randomCardType() {
  const rand = Math.floor(Math.random() * Object.keys(CardType).length);
  return CardType[Object.keys(CardType)[rand]];
}
