import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { User } from '../user/models/user.model';
import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): User {
    return this.categoryService.findOneByIdOrFail(id);
  }

  @Get()
  getUsers(): Category[] {
    return this.categoryService.findAll();
  }

  @Post()
  createUser(@Body() data: CreateCategoryDto): Category {
    return this.categoryService.createOne(data);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Category {
    return this.categoryService.deleteOneById(id);
  }
}
