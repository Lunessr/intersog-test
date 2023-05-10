import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CardState } from '../enums/cardState.enum';
import { CardType } from '../enums/cardType.enum';

@Entity({ name: 'cards' })
export class Cards extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    collation: 'utf8mb4_unicode_ci',
    length: 100,
  })
  name: string;

  @Column({
    name: 'owner_id',
    type: 'int',
  })
  ownerId: number;

  @Column({
    name: 'card_type',
    type: 'enum',
    enum: CardType,
    default: CardType.IRON,
  })
  cardType: CardType;

  @Column({
    name: 'card_state',
    type: 'enum',
    enum: CardState,
    default: CardState.ACTIVE,
  })
  cardState: CardState;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
