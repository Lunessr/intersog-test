import { config } from 'dotenv';

config();

export const typeOrmConfig: any = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/modules/database/migrations',
  },
};
