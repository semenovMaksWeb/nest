import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { UserService } from './user.server';
import { Reflector } from '@nestjs/core';
import { RouterServer } from '../router/router-server';
@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private routerServer: RouterServer,
    private userService: UserService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const routerName = this.reflector.get<string>('name', context.getHandler());
    const router = await this.routerServer.getKeyRouter(routerName);
    if (router && router.authorization) {
      // авторизация требуется
      const authorization = request.headers.authorization;
      if (authorization) {
        // токен  есть
        const user = await this.userService.findUserToken(authorization);
        request.user = user;
        if (!!user === false) {
          // user не найден
          throw new HttpException('Токен не валиден', HttpStatus.FORBIDDEN);
        }
        // user найден
        return true;
      }
      // токена нету
      throw new HttpException('Доступ закрыт', HttpStatus.FORBIDDEN);
    }
    // валидация отсутсвует
    return true;
  }
}
