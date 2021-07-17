import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { UserService } from './user.server';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const user = await this.userService.findUserToken(authorization);
    request.user = user;
    return !!user;
  }
}
