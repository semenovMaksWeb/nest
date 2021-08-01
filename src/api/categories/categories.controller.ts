import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.server';
import { UserGuard } from '../user/user.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('categories')
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  @UseGuards(UserGuard)
  async categoriesUser(@Request() req) {
    return await this.categoriesService.getCategoriesUser(req.user.id);
  }
}
