import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CardsController } from './cards.controller';
import { cardsProviders } from './cards.providers';
import { CardsRepository } from './cards.repository';
import { CardsService } from './cards.service';

@Module({
  controllers: [CardsController],
  providers: [...cardsProviders, CardsService, CardsRepository],
  imports: [DatabaseModule],
  exports: [CardsService],
})
export class CardsModule {}
