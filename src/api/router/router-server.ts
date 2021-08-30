import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Router } from './router.entity';
import { RouterSave } from './router.class/router-save';
import { Pagination } from '../../lib/api/pagination';
import { RouterFilterDto } from './router.dto/router-filter.dto';

import { RouterRightsDto } from './router.dto/router-rights.dto';
import { VariableServer } from '../variable/variable.server';

@Injectable()
export class RouterServer {
  constructor(
    @InjectRepository(Router)
    private routerRepository: Repository<Router>,
    private variableServer: VariableServer,
  ) {}

  async getAllRouter(routerFilterDto: RouterFilterDto): Promise<Router[]> {
    const { skip, take } = Pagination(
      routerFilterDto?.limit,
      routerFilterDto?.page,
    );
    return await this.routerRepository.find({
      take: take,
      skip: skip,
      relations: ['rights'],
    });
  }
  async getKeyRouter(key: string): Promise<Router> {
    return await this.routerRepository.findOne({ where: { key } });
  }
  async getKeyRouterRights(key: string): Promise<Router> {
    return await this.routerRepository.findOne({
      where: { key },
      relations: ['rights'],
    });
  }
  async saveRouterRights(id: number, body: RouterRightsDto) {
    const router = await this.findOneRouter(id);
    if (router) {
      await this.validateRouterRights(router, body);
      // update доделать rights map!
      return await this.routerRepository.save({
        ...router,
        rights: body.rights,
        authorization: body.authorization,
      });
    }
    this.errors404Router();
  }

  async findOneRouter(id: number) {
    return await this.routerRepository.findOne(id);
  }
  async validateRouterRights(router: Router, body: RouterRightsDto) {
    if (router.checkAdmin) {
      const rightsAdminId = await this.variableServer.getValKey(
        'rightsAdminId',
      );
      if (!body.rights.filter((e) => e.id === +rightsAdminId.value)[0]) {
        this.errorsRouterCheckAdmin();
      }
    }
    if (router.defaultAuthorization) {
      if (body.authorization !== router.authorization) {
        this.errorsRouterDefaultAuthorization();
      }
    }
    if (router.usersRolesAll && body.rights.length > 0) {
      this.errorsRouterUsersRolesAll();
    }
  }
  // функция для создание через парсинг файлов
  async savesRouter(router: RouterSave[]) {
    return await this.routerRepository.save(router);
  }

  errors404Router() {
    throw new HttpException('Указанный router не найден', HttpStatus.NOT_FOUND);
  }
  errorsRouterCheckAdmin() {
    throw new HttpException(
      'Указанный router требует id право с доступом к админ панели',
      HttpStatus.NOT_FOUND,
    );
  }
  errorsRouterDefaultAuthorization() {
    throw new HttpException(
      'Для указанного router нельзя изменить требования к авторизации',
      HttpStatus.NOT_FOUND,
    );
  }
  errorsRouterUsersRolesAll() {
    throw new HttpException(
      'Для указанного router нельзя добавить роли',
      HttpStatus.NOT_FOUND,
    );
  }
}
