
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { UserService } from './user.server';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (authorization) {
      const user = await this.userService.findUserToken(authorization);
      request.user = user;
      return !!user;
    }
    throw new HttpException('Доступ закрыт', HttpStatus.FORBIDDEN);
  }
}
