import { Category } from '../entities/category.entity';

export class CategoryDto {
  id: number;
  name: string;
  type: string;
  ownerId?: number;

  static fromEntity(entity: Category): CategoryDto {
    return {
      ...entity,
      ownerId: entity.owner?.id,
    } as CategoryDto;
  }
}
