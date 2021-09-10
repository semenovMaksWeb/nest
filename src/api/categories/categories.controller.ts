import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.server';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Categories, nameController } from 'src/lib/name/nameApi/Categories';
import { RouterName } from '../../lib/decorator/router-name.decorator';
import { UserGuard } from '../user/user.guard';
@Controller(nameController)
@ApiTags(nameController)
@ApiBearerAuth()
@UseGuards(UserGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @RouterName('categoriesUser')
  @Get(Categories.categoriesUser.name)
  async categoriesUser() {
    return await this.categoriesService.getCategoriesAll();
  }
}
