import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  nameController,
  ComponentsContent,
} from '../../../lib/name/nameApi/ComponentsContent';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserGuard } from '../../user/user.guard';

import { ComponentsContentServer } from './components-content.server';
import { RouterName } from '../../../lib/decorator/router-name.decorator';

@ApiTags(nameController)
@ApiBearerAuth()
@Controller(nameController)
@UseGuards(UserGuard)
export class ComponentsContentController {
  constructor(
    private readonly componentsContentServer: ComponentsContentServer,
  ) {}
  @Get(ComponentsContent.findContentIdComponents.name)
  @RouterName('findContentIdComponents')
  async findContentIdComponents(@Param('id') id: string) {
    return await this.componentsContentServer.findContentIdComponents(+id);
  }
}
