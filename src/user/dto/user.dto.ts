import { User } from '../entities/user.entity';

export class UserDto {
  id: number;
  name: string;
  defaultCurrencyId?: number;
  personalCategoriesIds?: number[];

  static fromEntity(entity: User): UserDto {
    return {
      ...entity,
      personalCategoriesIds:
        entity.personalCategories?.map((category) => category.id) ?? [],
    } as UserDto;
  }
}
