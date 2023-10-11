import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): UserDto {
    return this.userService.getUser(id);
  }

  @Get()
  getUsers(): UserDto[] {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() data: CreateUserDto): UserDto {
    return this.userService.createUser(data);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): UserDto {
    return this.userService.deleteUser(id);
  }
}
