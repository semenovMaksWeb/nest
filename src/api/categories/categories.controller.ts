import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.server';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('categories')
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get('/all')
  async categoriesUser() {
    return await this.categoriesService.getCategoriesAll();
  }
}
