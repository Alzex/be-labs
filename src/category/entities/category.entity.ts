import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryType } from '../enums/category-type.enum';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    enum: CategoryType,
    default: CategoryType.GLOBAL,
  })
  type: CategoryType;

  @ManyToOne(() => User, (user) => user.personalCategories, { nullable: true })
  owner?: User;

  ownerId?: number;
}
