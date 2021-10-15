import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
import { PostComponentsExampleParamsDto } from './components-example-params.dto/post-components-example-params.dto';
import { UpdateComponentsExampleParamsDto } from './components-example-params.dto/update-components-example-params.dto';

@ApiTags(nameController)
@ApiBearerAuth()
@Controller(nameController)
@UseGuards(UserGuard)
export class ComponentsExampleParamsController {
  constructor(
    private readonly componentsExampleParamsServer: ComponentsExampleParamsServer,
  ) {}
  /**
   * @description Добавить параметр contents для компонента
   */
  @Post(ComponentsExampleParams.postComponentsExampleParamsContent.name)
  @RouterName('postComponentsExampleParamsContent')
  async postComponentsExampleParamsContent(
    @Param('id') id: string,
    @Body(ValidationPipe) body: PostComponentsExampleParamsDto[],
  ) {
    return await this.componentsExampleParamsServer.postComponentsExampleParamsContent(
      +id,
      body,
    );
  }
   /**
   * @description показать параметр переменные css для компонента
   */
  @Get(ComponentsExampleParams.getComponentsExampleParamsIdVar.name)
  async getComponentsExampleParamsIdVar(@Param('id') id: string) {
    return await this.componentsExampleParamsServer.getComponentsExampleParamsIdVar(
      +id,
    );
  }
     /**
   * @description показать параметр contents для компонента
   */
  @Get(ComponentsExampleParams.getComponentsExampleParamsIdContent.name)
  async getComponentsExampleParamsIdContent(@Param('id') id: string) {
    return await this.componentsExampleParamsServer.getComponentsExampleParamsIdContent(
      +id,
    );
  }
     /**
   * @description добавить параметр переменные css для компонента
   */
  @Post(ComponentsExampleParams.postComponentsExampleParamsVar.name)
  @RouterName('postComponentsExampleParamsVar')
  async postComponentsExampleParamsVar(
    @Param('id') id: string,
    @Body(ValidationPipe) body: PostComponentsExampleParamsDto[],
  ) {
    return await this.componentsExampleParamsServer.postComponentsExampleParamsVar(
      +id,
      body,
    );
  }
      /**
   * @description изменить 1запись параметра для компонента
   */
  @Put(ComponentsExampleParams.updateComponentsExampleParams.name)
  @RouterName('updateComponentsExampleParams')
  async updateComponentsExampleParams( @Param('id') id: string,
  @Body(ValidationPipe) body: UpdateComponentsExampleParamsDto){
    return await this.componentsExampleParamsServer.updateComponentsExampleParams(+id, body);
  }
}
