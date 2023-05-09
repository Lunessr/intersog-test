import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../../constants/providers';
import { Cards } from '../../entities/cards.entity';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'intersog',
        entities: [Cards],
        migrations: ['dist/modules/database/migrations/**{.ts,.js}'],
        synchronize: false,
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];
