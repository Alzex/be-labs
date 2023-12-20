import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!('authorization' in request.headers)) {
      return false;
    }

    const jwt = request.headers.authorization.split(' ')[1];

    const payload = this.authService.validateJwt(jwt);

    request.userId = payload.sub;
    request.userName = payload.name;

    return true;
  }
}
