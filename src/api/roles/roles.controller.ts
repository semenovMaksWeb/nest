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

@Controller('roles')
@ApiTags('roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get('/all')
  async rolesAll(@Query() params: RolesGetFilterDto) {
    return await this.rolesService.rolesAll(params);
  }
  @Post('')
  async rolesSave(@Body(ValidationPipe) rolesSaveDto: RolesSaveDto) {
    return await this.rolesService.saveRoles(rolesSaveDto);
  }
  @Put(':id')
  async rolesUpdate(
    @Body(ValidationPipe) rolesSaveDto: RolesSaveDto,
    @Param('id') id: string,
  ) {
    return await this.rolesService.updateRoles(rolesSaveDto, +id);
  }
  @Delete(':id')
  async rolesDelete(@Param('id') id: string) {
    return await this.rolesService.deleteRoles(+id);
  }
}
