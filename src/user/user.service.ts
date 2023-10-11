import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly users: Map<number, UserDto> = new Map();

  createUser(data: CreateUserDto): UserDto {
    const id = this.users.size + 1;
    const user = new UserDto();
    user.id = id;
    user.name = data.name;
    this.users.set(id, user);
    return user;
  }

  getUser(id: number): UserDto {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  getUsers(): UserDto[] {
    return Array.from(this.users.values());
  }

  deleteUser(id: number): UserDto {
    const user = this.users.get(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users.delete(id);
    return user;
  }
}
