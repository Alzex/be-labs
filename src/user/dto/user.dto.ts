import { User } from '../entities/user.entity';

export class UserDto {
  id: number;
  name: string;
  defaultCurrencyId?: number;
  personalCategoriesIds?: number[];

  static fromEntity(entity: User): UserDto {
    return {
      id: entity.id,
      name: entity.name,
      defaultCurrencyId: entity.defaultCurrency?.id,
      personalCategoriesIds:
        entity.personalCategories?.map((category) => category.id) ?? [],
    } as UserDto;
  }
}
