import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.findOneByIdOrFail(id);
  }

  @Get()
  getUsers(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() data: CreateUserDto): Promise<UserDto> {
    return this.userService.createOne(data);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.deleteOneById(id);
  }
}
