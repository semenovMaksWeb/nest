import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { nameController, Router } from '../../lib/name/nameApi/Router';
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
import { UserGuard } from '../user/user.guard';
import { RouterServer } from './router-server';
import { RouterFilterDto } from './router.dto/router-filter.dto';
import { RouterRightsDto } from './router.dto/router-rights.dto';
import { RouterName } from '../../lib/decorator/router-name.decorator';

@ApiTags(nameController)
@ApiBearerAuth()
@Controller(nameController)
@UseGuards(UserGuard)
export class RouterController {
  constructor(private readonly routerServer: RouterServer) {}
  @Get(Router.getRouterAll.name)
  @RouterName('getRouterAll')
  async getRouterAll(@Query(null, ValidationPipe) query: RouterFilterDto) {
    return await this.routerServer.getAllRouter(query);
  }

  @Post(Router.setRouterRights.name)
  @RouterName('setRouterRights')
  async setRouterRights(
    @Body(ValidationPipe) routerRightsDto: RouterRightsDto,
    @Param('id') id: string,
  ) {
    return await this.routerServer.saveRouterRights(+id, routerRightsDto);
  }
}
