import { TestingModule, Test } from '@nestjs/testing';
import { Cards } from '../../src/entities/cards.entity';
import { CardsRepository } from '../../src/modules/cards/cards.repository';
import { CardsService } from '../../src/modules/cards/cards.service';
import { CreateCardDto } from '../../src/modules/cards/dto/createCard.dto';
import { randomCardType, randomOwnerId } from '../utils/utils';
import { BadRequestException } from '@nestjs/common';
import { CARD_EXIST } from '../../src/constants/errors';

describe('CardsService', () => {
  let cardsService: CardsService;
  let cardsRepository: CardsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: CardsRepository,
          useValue: {
            createCard: jest.fn(),
            getCardBy: jest.fn(),
          },
        },
      ],
    }).compile();

    cardsService = module.get<CardsService>(CardsService);
    cardsRepository = module.get<CardsRepository>(CardsRepository);
  });

  describe('create', () => {
    it('should return created card', async () => {
      let ownerId = randomOwnerId();
      let createCardDto: CreateCardDto = {
        ownerId,
        name: `Name ${ownerId}`,
        cardType: randomCardType(),
      };
      const card = new Cards();
      card.id = 1;
      card.ownerId = ownerId;
      card.name = createCardDto.name;
      card.cardType = createCardDto.cardType;

      const getCardBySpy = jest
        .spyOn(cardsRepository, 'getCardBy')
        .mockResolvedValue(null);

      const createCardSpy = jest
        .spyOn(cardsRepository, 'createCard')
        .mockResolvedValue(card);

      const result = await cardsService.createCard(createCardDto);

      expect(getCardBySpy).toBeCalledWith({ ownerId });
      expect(createCardSpy).toBeCalledWith(createCardDto);
      expect(result).toBe(card);
    });

    it('should throw bad request exception in case owner id exists', async () => {
      let ownerId = randomOwnerId();
      let createCardDto: CreateCardDto = {
        ownerId,
        name: `Name ${ownerId}`,
        cardType: randomCardType(),
      };
      const card = new Cards();
      card.id = 1;
      card.ownerId = ownerId;
      card.name = createCardDto.name;
      card.cardType = createCardDto.cardType;

      const getCardBySpy = jest
        .spyOn(cardsRepository, 'getCardBy')
        .mockResolvedValue(card);

      expect(cardsService.createCard(createCardDto)).rejects.toThrowError(
        new BadRequestException(CARD_EXIST),
      );

      expect(getCardBySpy).toBeCalledWith({ ownerId });
    });
  });
});
