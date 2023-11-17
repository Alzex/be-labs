import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findOneByIdOrFail(id: number): Promise<CategoryDto> {
    const result = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!result) {
      throw new NotFoundException('Category not found');
    }

    return CategoryDto.fromEntity(result);
  }

  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.find();

    return categories.map((category) => CategoryDto.fromEntity(category));
  }

  async createOne(data: CreateCategoryDto): Promise<CategoryDto> {
    const category = this.categoryRepository.create(data);

    await this.categoryRepository.save(category);

    return CategoryDto.fromEntity(category);
  }

  async deleteOneById(id: number): Promise<CategoryDto> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.remove(category);

    return CategoryDto.fromEntity(category);
  }
}
