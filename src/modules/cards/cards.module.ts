import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsRepository } from './cards.repository';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from '../../entities/cards.entity';

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsRepository],
  imports: [TypeOrmModule.forFeature([Cards])],
  exports: [CardsService],
})
export class CardsModule {}
