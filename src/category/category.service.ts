import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { BasicCrudService } from '../common/basic-crud.service';

@Injectable()
export class CategoryService extends BasicCrudService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }

  async findOneByIdOrFail(id: number): Promise<CategoryDto> {
    const result = await this.findOne({
      id,
    });

    if (!result) {
      throw new NotFoundException('Category not found');
    }

    return CategoryDto.fromEntity(result);
  }

  async findAllDto(): Promise<CategoryDto[]> {
    const categories = await this.findAll({
      owner: true,
    });

    return categories.map((category) => CategoryDto.fromEntity(category));
  }

  async createOneFromDto(data: CreateCategoryDto): Promise<CategoryDto> {
    const category = await this.createOne(data);

    return CategoryDto.fromEntity(category);
  }

  async deleteOneById(id: number): Promise<CategoryDto> {
    const category = await this.deleteOne({
      id,
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return CategoryDto.fromEntity(category);
  }
}
