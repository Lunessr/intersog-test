import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { DATA_SOURCE } from '../../constants/providers';

config();

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        migrations: ['dist/modules/database/migrations/**{.ts,.js}'],
        synchronize: false,
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];
