import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
  ValidationPipe
} from "@nestjs/common";
import { CategoriesService } from './categories.server';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Categories, nameController } from 'src/lib/name/nameApi/Categories';
import { RouterName } from '../../lib/decorator/router-name.decorator';
import { UserGuard } from '../user/user.guard';
import { CategoriesCreateDto } from './categories.dto/categories-create.dto';
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

  @RouterName('categoriesPost')
  @Post(Categories.categoriesPost.name)
  async categoriesPost(@Body(ValidationPipe) categories: CategoriesCreateDto) {
    return await this.categoriesService.postCategories(categories);
  }

  @RouterName('updateCategoriesTodoUser')
  @Put(Categories.updateCategoriesTodoUser.name)
  async updateCategoriesTodoUser(
    @Body(ValidationPipe) categories: CategoriesCreateDto,
    @Request() req,
    @Param('id') id: string,
  ) {
    return await this.categoriesService.updateCategoriesTodoUser(
      req['user'].id,
      +id,
      categories,
    );
  }

  @RouterName('deleteCategoriesTodoUser')
  @Delete(Categories.deleteCategoriesTodoUser.name)
  async deleteCategoriesTodoUser(@Request() req, @Param('id') id: string) {
    return await this.categoriesService.deleteCategoriesTodoUser(
      req['user'].id,
      +id,
    );
  }
}
