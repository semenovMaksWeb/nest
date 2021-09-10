import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.server';
import { RolesGetFilterDto } from './roles.dto/roles-get-filter.dto';
import { RolesSaveDto } from './roles.dto/roles-save.dto';
import { RolesSaveRightsDto } from './roles.dto/roles-save-rights.dto';
import { Roles, nameController } from 'src/lib/name/nameApi/Roles';
import { UserGuard } from '../user/user.guard';
import { RouterName } from '../../lib/decorator/router-name.decorator';
@Controller(nameController)
@ApiTags(nameController)
@ApiBearerAuth()
@UseGuards(UserGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get(Roles.rolesAll.name)
  @RouterName('rolesAll')
  async rolesAll(@Query() params: RolesGetFilterDto) {
    return await this.rolesService.rolesAll(params);
  }

  @Post(Roles.rolesSave.name)
  @RouterName('rolesSave')
  async rolesSave(@Body(ValidationPipe) rolesSaveDto: RolesSaveDto) {
    return await this.rolesService.saveRoles(rolesSaveDto);
  }

  @Post(Roles.rolesSaveRights.name)
  @RouterName('rolesSaveRights')
  async rolesSaveRights(
    @Body(ValidationPipe) rolesSaveRightsDto: RolesSaveRightsDto,
  ) {
    return await this.rolesService.saveRolesRights(rolesSaveRightsDto);
  }

  @Put(Roles.rolesUpdate.name)
  @RouterName('rolesUpdate')
  async rolesUpdate(
    @Body(ValidationPipe) rolesSaveDto: RolesSaveDto,
    @Param('id') id: string,
  ) {
    return await this.rolesService.updateRoles(rolesSaveDto, +id);
  }

  @Delete(Roles.rolesDelete.name)
  @RouterName('rolesDelete')
  async rolesDelete(@Param('id') id: string) {
    return await this.rolesService.deleteRoles(+id);
  }
}
