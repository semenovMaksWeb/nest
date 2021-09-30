import { ComponentsExampleServer } from './components-example.server';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ComponentsExample,
  nameController,
} from 'src/lib/name/nameApi/ComponentsExample';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ComponentsExamplePostDto } from './components-example.dto/components-example-post.dto';
import { RouterName } from '../../../lib/decorator/router-name.decorator';
import { UserGuard } from '../../user/user.guard';
import { ComponentsExampleFilter } from './components-example.dto/components-example-filter';

@ApiTags(nameController)
@ApiBearerAuth()
@Controller(nameController)
@UseGuards(UserGuard)
export class ComponentsExampleController {
  constructor(
    private readonly componentsExampleServer: ComponentsExampleServer,
  ) {}

  @Post(ComponentsExample.postComponentsExample.name)
  @RouterName('postComponentsExample')
  async postComponentsExample(
    @Body(ValidationPipe) body: ComponentsExamplePostDto,
  ) {
    return await this.componentsExampleServer.postComponentsExample(body);
  }

  @Get(ComponentsExample.getAllComponentsExample.name)
  @RouterName('getAllComponentsExample')
  async getAllComponentsExample(
    @Query(null, ValidationPipe) query: ComponentsExampleFilter,
  ) {
    return await this.componentsExampleServer.getAllComponentsExample(query);
  }
  @Get(ComponentsExample.getIdComponentsExample.name)
  @RouterName('getIdComponentsExample')
  async getIdComponentsExample(@Param('id') id: string) {
    return await this.componentsExampleServer.getIdComponentsExample(+id);
  }
}
