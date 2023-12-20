import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { AuthDto } from './dto/signin.dto';
import { User } from '../user/entities/user.entity';
import { JwtPayload } from './types/jwt-payload.type';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: AuthDto) {
    const existing = await this.userService.findOne({
      name: dto.name,
    });

    if (existing) {
      throw new BadRequestException('User with this name already exists');
    }

    const newUser = new User();

    newUser.name = dto.name;

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(dto.password, salt);

    newUser.passwordHash = hashed;
    newUser.passwordSalt = salt;

    const user = await this.userService.createOne(newUser);

    return {
      success: true,
      user: UserDto.fromEntity(user),
    };
  }

  async signIn(dto: AuthDto) {
    const user = await this.userService.findOne({
      name: dto.name,
    });

    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    const match = await bcrypt.compare(dto.password, user.passwordHash);

    if (!match) {
      throw new BadRequestException('Invalid username or password');
    }

    const payload = {
      sub: user.id,
      name: user.name,
    } as JwtPayload;

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  validateJwt(token: string): JwtPayload {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
