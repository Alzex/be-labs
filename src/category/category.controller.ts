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
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): User {
    return this.categoryService.findOneById(id);
  }

  @Get()
  getUsers(): User[] {
    return this.categoryService.findAll();
  }

  @Post()
  createUser(@Body() data: CreateUserDto): User {
    return this.categoryService.createOne(data);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): User {
    return this.categoryService.deleteOneById(id);
  }
}
