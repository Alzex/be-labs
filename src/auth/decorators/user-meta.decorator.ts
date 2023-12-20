import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserMetadata } from '../types/user-metadata.type';

export const UserMeta = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return {
      userId: req.userId,
      userName: req.userName,
    } as UserMetadata;
  },
);
