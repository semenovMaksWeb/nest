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
      return await this.userService.findUserToken(authorization);
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
    const idRolesAll = await this.variableServer.getValKey('rolesAllId');
    const user = request.user;
    if (!user.roles.some((elem) => elem.id === idRolesAll.value)) {
      throw new HttpException('Доступ закрыт', HttpStatus.FORBIDDEN);
    }
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
        await this.checkValidateRights(router, request);
      }
      return true;
    }
    // валидация отсутсвует
    return true;
  }
}
