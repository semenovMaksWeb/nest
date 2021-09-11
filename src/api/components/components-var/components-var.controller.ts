import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  nameController,
  ComponentsVar,
} from '../../../lib/name/nameApi/ComponentsVar';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserGuard } from '../../user/user.guard';

import { ComponentsVarServer } from './components-var.server';
import { RouterName } from '../../../lib/decorator/router-name.decorator';

@ApiTags(nameController)
@ApiBearerAuth()
@Controller(nameController)
@UseGuards(UserGuard)
export class ComponentsVarController {
  constructor(private readonly componentsContentServer: ComponentsVarServer) {}
  @Get(ComponentsVar.findVarIdComponents.name)
  @RouterName('findVarIdComponents')
  async findContentIdComponents(@Param('id') id: string) {
    return await this.componentsContentServer.findVarIdComponents(+id);
  }
}
