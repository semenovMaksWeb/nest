/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RouterName } from '../../lib/decorator/router-name.decorator';
import { SupportService } from './support.service';
import { Support, nameController } from 'src/lib/name/nameApi/Support';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../user/user.guard';
import { SupportFilterDto } from './support.dto/support-filter.dto';

@ApiTags(nameController)
@ApiBearerAuth()
@Controller(nameController)
@UseGuards(UserGuard)
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post(Support.postSupport.name)
  @RouterName('postUser')
  async postSupport(@Body(ValidationPipe) body: any) {
    return await this.supportService.postSupport(body);
  }

  @Get(Support.getSupportAll.name)
  @RouterName('postUser')
  async getSupportAll(
    @Param(null, ValidationPipe) supportFilterDto: SupportFilterDto,
  ) {
    return await this.supportService.getSupportAll(supportFilterDto);
  }
}
