import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): User {
    return this.userService.findOneByIdOrFail(id);
  }

  @Get()
  getUsers(): User[] {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() data: CreateUserDto): User {
    return this.userService.createOne(data);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): User {
    return this.userService.deleteOneById(id);
  }
}
