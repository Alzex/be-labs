import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryDto } from './dto/category.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number): Promise<CategoryDto> {
    return this.categoryService.findOneByIdOrFail(id);
  }

  @Get()
  getCategories(): Promise<CategoryDto[]> {
    return this.categoryService.findAllDto();
  }

  @Post()
  createCategory(@Body() data: CreateCategoryDto): Promise<CategoryDto> {
    return this.categoryService.createOneFromDto(data);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<CategoryDto> {
    return this.categoryService.deleteOneById(id);
  }
}
