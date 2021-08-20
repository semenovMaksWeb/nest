import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.server';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Categories, nameController } from 'src/lib/name/nameApi/Categories';
@Controller(nameController)
@ApiTags(nameController)
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get(Categories.categoriesUser.name)
  async categoriesUser() {
    return await this.categoriesService.getCategoriesAll();
  }
}
