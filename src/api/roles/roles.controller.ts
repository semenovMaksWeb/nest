import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.server';
import { RolesGetFilterDto } from './roles.dto/roles-get-filter.dto';
import { RolesSaveDto } from './roles.dto/roles-save.dto';
import { RolesSaveRightsDto } from './roles.dto/roles-save-rights.dto';
import { Roles, nameController } from 'src/name/nameApi/Roles';
@Controller(nameController)
@ApiTags(nameController)
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get(Roles.rolesAll.name)
  async rolesAll(@Query() params: RolesGetFilterDto) {
    return await this.rolesService.rolesAll(params);
  }
  @Post(Roles.rolesSave.name)
  async rolesSave(@Body(ValidationPipe) rolesSaveDto: RolesSaveDto) {
    return await this.rolesService.saveRoles(rolesSaveDto);
  }
  @Post(Roles.rolesSaveRights.name)
  async rolesSaveRights(
    @Body(ValidationPipe) rolesSaveRightsDto: RolesSaveRightsDto,
  ) {
    return await this.rolesService.saveRolesRights(rolesSaveRightsDto);
  }
  @Put(Roles.rolesUpdate.name)
  async rolesUpdate(
    @Body(ValidationPipe) rolesSaveDto: RolesSaveDto,
    @Param('id') id: string,
  ) {
    return await this.rolesService.updateRoles(rolesSaveDto, +id);
  }
  @Delete(Roles.rolesDelete.name)
  async rolesDelete(@Param('id') id: string) {
    return await this.rolesService.deleteRoles(+id);
  }
}
