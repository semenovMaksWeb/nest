import { ComponentsExampleServer } from './components-example.server';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ComponentsExample,
  nameController,
} from 'src/lib/name/nameApi/ComponentsExample';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ComponentsExamplePostDto } from './components-example.dto/components-example-post.dto';
import { RouterName } from '../../../lib/decorator/router-name.decorator';
import { UserGuard } from '../../user/user.guard';
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
}
