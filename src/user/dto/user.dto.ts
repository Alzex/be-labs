import { User } from '../entities/user.entity';

export class UserDto {
  id: number;
  name: string;

  static fromEntity(entity: User): UserDto {
    return {
      ...entity,
    } as UserDto;
  }
}
