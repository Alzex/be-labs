import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map(UserDto.fromEntity);
  }

  async findOneByIdOrFail(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserDto.fromEntity(user);
  }

  async createOne(data: CreateUserDto): Promise<UserDto> {
    const user = this.userRepository.create(data);

    await this.userRepository.save(user);

    return UserDto.fromEntity(user);
  }

  async deleteOneById(id: number): Promise<UserDto> {
    const user = await this.findOneByIdOrFail(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);

    return user;
  }
}
