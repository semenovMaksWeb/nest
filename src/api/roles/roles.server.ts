import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './roles.entity';
import { Repository } from 'typeorm';
import { Pagination } from '../../lib/api/pagination';
import { RolesGetFilterDto } from './roles.dto/roles-get-filter.dto';
import { RolesSaveDto } from './roles.dto/roles-save.dto';
import { RolesSaveRightsDto } from './roles.dto/roles-save-rights.dto';
import { RightsService } from '../rights/rights.server';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    private rightsServer: RightsService,
  ) {}
  async saveRoles(rolesBody: RolesSaveDto) {
    await this.validateBdRoles(rolesBody.name);
    await this.rolesRepository.save({
      name: rolesBody.name,
    });
    return `Роль удачно создана`;
  }
  async saveRolesRights(rolesRightsBody: RolesSaveRightsDto) {
    rolesRightsBody.rights = await this.rightsServer.saveRightsRoles(
      rolesRightsBody.rights,
    );
    await this.rolesRepository.save(rolesRightsBody);
  }

  async updateRoles(rolesBody: RolesSaveDto, id: number) {
    const roles = await this.validateBdNull(id);
    await this.validateBdRoles(rolesBody.name, roles.id);
    await this.rolesRepository.update(id, {
      name: rolesBody.name,
    });
    return 'Роль успешно измененно';
  }
  async deleteRoles(id: number) {
    await this.validateBdNull(id);
    await this.rolesRepository.delete(id);
    return 'Роль успешно удалена';
  }
  async rolesAll(param: RolesGetFilterDto) {
    const { skip, take } = Pagination(param?.limit, param?.page);
    return await this.rolesRepository.find({
      take: take,
      skip: skip,
      relations: ['rights'],
    });
  }

  async getRolesFindName(name: string): Promise<Roles> {
    return await this.rolesRepository.findOne({ where: { name: name } });
  }
  async getRolesFindId(id: number): Promise<Roles> {
    return await this.rolesRepository.findOne(id);
  }

  private async validateBdRoles(name: string, id?: number) {
    const rights = await this.getRolesFindName(name);
    if (rights && rights.id !== id) {
      RolesService.errorsRolesName();
    }
  }
  private async validateBdNull(id: number) {
    const roles = await this.getRolesFindId(id);
    if (!roles) {
      RolesService.errorsRolesNull();
    }
    return roles;
  }

  private static errorsRolesName() {
    throw new HttpException(
      'Указанный название роли уже существует',
      HttpStatus.BAD_REQUEST,
    );
  }
  private static errorsRolesNull() {
    throw new HttpException(
      'Роль с указанным id не существует',
      HttpStatus.BAD_REQUEST,
    );
  }
}
