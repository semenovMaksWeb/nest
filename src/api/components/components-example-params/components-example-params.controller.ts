import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserGuard } from '../../user/user.guard';

import {
  nameController,
  ComponentsExampleParams,
} from '../../../lib/name/nameApi/ComponentsExampleParams';

import { ComponentsExampleParamsServer } from './components-example-params.server';
import { RouterName } from '../../../lib/decorator/router-name.decorator';

@ApiTags(nameController)
@ApiBearerAuth()
@Controller(nameController)
@UseGuards(UserGuard)
export class ComponentsExampleParamsController {
  constructor(
    private readonly componentsExampleParamsServer: ComponentsExampleParamsServer,
  ) {}
  @Post(ComponentsExampleParams.postComponentsExampleParamsContent.name)
  @RouterName('postComponentsExampleParamsContent')
  async postComponentsExampleParamsContent(
    @Param('id') id: string,
    @Body(ValidationPipe) body: any,
  ) {
    return await this.componentsExampleParamsServer.postComponentsExampleParamsContent(
      +id,
      body,
    );
  }

  @Post(ComponentsExampleParams.postComponentsExampleParamsVar.name)
  @RouterName('postComponentsExampleParamsVar')
  async postComponentsExampleParamsVar(
    @Param('id') id: string,
    @Body(ValidationPipe) body: any,
  ) {
    return await this.componentsExampleParamsServer.postComponentsExampleParamsVar(
      +id,
      body,
    );
  }
}
