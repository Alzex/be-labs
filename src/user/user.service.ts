import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { BasicCrudService } from '../common/basic-crud.service';

@Injectable()
export class UserService extends BasicCrudService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findOneByIdOrFail(id: number): Promise<UserDto> {
    const user = await this.findOne(
      {
        id,
      },
      {
        defaultCurrency: true,
        personalCategories: true,
      },
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserDto.fromEntity(user);
  }
}
