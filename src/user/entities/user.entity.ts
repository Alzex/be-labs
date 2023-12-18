import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Currency } from '../../currency/entities/currency.entity';
import { Category } from '../../category/entities/category.entity';
import { OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @ManyToOne(() => Currency, (currency) => currency.id, { nullable: true })
  defaultCurrency?: Currency;

  @OneToMany(() => Category, (category) => category.owner)
  personalCategories: Category[];

  @Column({ nullable: true })
  defaultCurrencyId?: number;
}
