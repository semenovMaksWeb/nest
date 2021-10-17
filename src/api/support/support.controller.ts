/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RouterName } from '../../lib/decorator/router-name.decorator';
import { SupportService } from './support.service';
import { Support, nameController } from 'src/lib/name/nameApi/Support';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../user/user.guard';
import { SupportFilterDto } from './support.dto/support-filter.dto';
import { SupportActiveDto } from './support.dto/support-active.dto';
import { SupportPostDto } from './support.dto/support-post.dto';
import { CategoriesService } from '../categories/categories.server';

@ApiTags(nameController)
@ApiBearerAuth()
@Controller(nameController)
@UseGuards(UserGuard)
export class SupportController {
  constructor(
    private readonly supportService: SupportService,
    private readonly categoriesService: CategoriesService,
    ) {}

  @Post(Support.postSupport.name)
  @RouterName('postSupport')
  async postSupport(@Body(ValidationPipe) body: SupportPostDto) {
    console.log(body);    
    return await this.supportService.postSupport(body);
  }

  @Put(Support.updateActiveSupport.name)
  @RouterName('updateActiveSupport')
  async updateActiveSupport(
    @Param('id') id: string,
    @Body(ValidationPipe) body: SupportActiveDto) {
    return await this.supportService.updateActiveSupport(+id,body);
  }



  @Get(Support.getSupportAll.name)
  @RouterName('getSupportAll')
  async getSupportAll(
    @Query(null, ValidationPipe) supportFilterDto: SupportFilterDto,
  ) {
    return await this.supportService.getSupportAll(supportFilterDto);
  }
}
