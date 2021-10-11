/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { RouterName } from '../../lib/decorator/router-name.decorator';
import { SupportService } from './support.service';
import {
    Support,
    nameController,
} from 'src/lib/name/nameApi/Support';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../user/user.guard';
import { SupportPostDto } from './support.dto/support-post.dto';
import { SupportFilterDto } from './support.dto/support-filter.dto';

@ApiTags(nameController)
@ApiBearerAuth()
@Controller(nameController)
@UseGuards(UserGuard)
export class SupportController {
    constructor(private readonly supportService: SupportService) { }


    
  @Post(Support.postSupport.name)
  @RouterName('postUser')
  postSupport(@Body(ValidationPipe) supportPostDto: SupportPostDto) {
    // return this.supportService
  }

  @Get(Support.getSupportAll.name)
  @RouterName('postUser')
  getSupportAll(@Param(null, ValidationPipe) supportFilterDto: SupportFilterDto) {
    // return this.supportService
  }
}
