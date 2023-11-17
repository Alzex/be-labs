import { Category } from '../entities/category.entity';

export class CategoryDto {
  id: number;
  name: string;

  static fromEntity(entity: Category): CategoryDto {
    return {
      ...entity,
    } as CategoryDto;
  }
}
