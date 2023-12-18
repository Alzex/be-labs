import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../category/entities/category.entity';
import { Currency } from '../../currency/entities/currency.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'int',
    default: 0,
  })
  amount: number;

  @Column({
    type: 'int',
  })
  userId: number;

  @Column({
    type: 'int',
  })
  categoryId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Category)
  category: Category;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => Currency)
  currency: Currency;

  @Column({ nullable: true })
  currencyId: number;
}
