import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { nameController, Router } from '../../lib/name/nameApi/Router';
import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserGuard } from '../user/user.guard';
import { RouterServer } from './router-server';
import { RouterFilterDto } from './router.dto/router-filter.dto';

@ApiTags(nameController)
@ApiBearerAuth()
@Controller(nameController)
@UseGuards(UserGuard)
export class RouterController {
  constructor(private readonly routerServer: RouterServer) {}
  @Get(Router.getRouterAll.name)
  async getRouterAll(@Query(null, ValidationPipe) query: RouterFilterDto) {
    return await this.routerServer.getAllRouter(query);
  }
}
