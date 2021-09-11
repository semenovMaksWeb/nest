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
import { WsException } from '@nestjs/websockets';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private routerServer: RouterServer,
    private userService: UserService,
    private variableServer: VariableServer,
    private reflector: Reflector,
  ) {}
  async checkValidateUserToken(authorization: string, checkValidate: string) {
    if (authorization) {
      // токен  есть
      return await this.userService.findUserToken(authorization, checkValidate);
    }
    this.errors403CloseAccess(checkValidate);
  }
  async checkValidateRights(router: Router, request, checkValidate: string) {
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
    return check
      ? true
      : await this.checkValidateRightsSyperAdmin(request, checkValidate);
  }
  async checkValidateRightsSyperAdmin(request, checkValidate) {
    const idRolesAll = await this.variableServer.getValKey('rolesAllId');
    const user = request.user;
    if (!user.roles.some((elem) => elem.id === +idRolesAll.value)) {
      this.errors403CloseAccess(checkValidate);
    }
    return true;
  }
  errors403CloseAccess(checkValidate: string) {
    if (checkValidate === 'rest') {
      throw new HttpException('Доступ закрыт', HttpStatus.FORBIDDEN);
    } else if (checkValidate === 'webSocket') {
      console.log('Доступ закрыт');
      throw new WsException('Доступ закрыт');
    }
  }
  // узнать валидация сокета или rest
  checkValidateRestOrSocket(request) {
    let checkValidate = 'rest';
    let authorization = '';
    if (request?.headers?.authorization) {
      authorization = request.headers.authorization;
      checkValidate = 'rest';
    } else if (request?.handshake?.headers?.authorization) {
      checkValidate = 'webSocket';
      authorization = request.handshake.headers.authorization;
    }
    // токен не передан!
    else {
      if (request?.headers) {
        this.errors403CloseAccess('rest');
      } else {
        this.errors403CloseAccess('webSocket');
      }
    }
    return { checkValidate, authorization };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const routerName = this.reflector.get<string>('name', context.getHandler());
    const router = await this.routerServer.getKeyRouterRights(routerName);
    // валидация требуется
    if (router && router.authorization) {
      const { authorization, checkValidate } =
        this.checkValidateRestOrSocket(request);

      request.user = await this.checkValidateUserToken(
        authorization,
        checkValidate,
      );
      if (router.rights.length > 0) {
        await this.checkValidateRights(router, request, checkValidate);
      }
      return true;
    }
    // валидация отсутсвует
    return true;
  }
}
