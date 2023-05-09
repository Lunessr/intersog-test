import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfig from './configs/typeorm.config';
import { CardsModule } from './modules/cards/cards.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
