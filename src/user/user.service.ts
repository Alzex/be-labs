import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { LocalCrudService } from '../../common/local-crud.service';

@Injectable()
export class UserService extends LocalCrudService<User> {
  constructor() {
    super(User);
  }
}
