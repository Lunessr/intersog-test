import { DataSource } from 'typeorm';
import { DATA_SOURCE, CARDS_REPOSITORY } from '../../constants/providers';
import { Cards } from '../../entities/cards.entity';

export const cardsProviders = [
  {
    provide: CARDS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cards),
    inject: [DATA_SOURCE],
  },
];
