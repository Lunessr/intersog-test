import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { CardsModule } from './modules/cards/cards.module';

config();
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
