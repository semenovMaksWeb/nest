import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { UserService } from './user.server';
import { Reflector } from '@nestjs/core';
import { RouterServer } from '../router/router-server';
import { VariableServer } from '../variable/variable.server';
import { Router } from '../router/router.entity';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private routerServer: RouterServer,
    private userService: UserService,
    private variableServer: VariableServer,
    private reflector: Reflector,
  ) {}
  async checkValidateUserToken(authorization: string) {
    if (authorization) {
      // токен  есть
      const user = await this.userService.findUserToken(authorization);
      if (!!user === false) {
        // user не найден
        throw new HttpException('Токен не валиден', HttpStatus.FORBIDDEN);
      }
      // user найден
      return user;
    }
    throw new HttpException('Доступ закрыт', HttpStatus.FORBIDDEN);
  }
  async checkValidateRights(router: Router, request) {
    const user = request.user;
    let check = false;
    router.rights.map((routerR) => {
      user.roles.map((userRole) => {
        userRole.rights.map((UserRights) => {
          if (UserRights.id === routerR.id) {
            check = true;
          }
        });
      });
    });
    return check ? true : await this.checkValidateRightsSyperAdmin(request);
  }
  async checkValidateRightsSyperAdmin(request) {
    const idRightsAll = await this.variableServer.getValKey('rightsAllId');
    const user = request.user;
    return user.roles.some(
      (elem) => elem.rights.filter((e) => e.id === +idRightsAll.value)[0],
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const routerName = this.reflector.get<string>('name', context.getHandler());
    const router = await this.routerServer.getKeyRouterRights(routerName);
    // валидация требуется
    if (router && router.authorization) {
      const authorization = request.headers.authorization;
      request.user = await this.checkValidateUserToken(authorization);
      if (router.rights.length > 0) {
        return await this.checkValidateRights(router, request);
      }
      return true;
    }
    // валидация отсутсвует
    return true;
  }
}
