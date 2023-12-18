import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { CategoryType } from '../enums/category-type.enum';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsEnum(CategoryType)
  type: CategoryType;

  @IsOptional()
  @IsInt()
  @Min(1)
  ownerId?: number;
}
