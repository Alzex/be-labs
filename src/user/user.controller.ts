import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.findOneByIdOrFail(id);
  }

  @Get()
  getUsers(): Promise<UserDto[]> {
    return this.userService.findAllDto();
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.deleteOneById(id);
  }
}
