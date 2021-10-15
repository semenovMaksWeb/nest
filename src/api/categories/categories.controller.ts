import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.server';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Categories, nameController } from 'src/lib/name/nameApi/Categories';
import { RouterName } from '../../lib/decorator/router-name.decorator';
import { UserGuard } from '../user/user.guard';
import { CategoriesCreateDto } from './categories.dto/categories-create.dto';
/**
 * @description контроллер categories
 */
@Controller(nameController)
@ApiTags(nameController)
@ApiBearerAuth()
@UseGuards(UserGuard)
/**
 * @description classCategoriesController
 */
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
 /**
 * @description получить все категории пользователя (админ)
 */
  @RouterName('categoriesUser')
  @Get(Categories.categoriesUser.name)
  async categoriesUser() {
    return await this.categoriesService.getCategoriesAll();
  }
  /**
 * @description   создать категорию пользователю (all)
 */
  @RouterName('categoriesPost')
  @Post(Categories.categoriesPost.name)
  async categoriesPost(@Body(ValidationPipe) categories: CategoriesCreateDto) {
    return await this.categoriesService.postCategories(categories);
  }
  /**
  * @description изменить категорию пользователя по todo
  */
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
    /**
  * @description удалить категорию пользователя по todo
  */
  @RouterName('deleteCategoriesTodoUser')
  @Delete(Categories.deleteCategoriesTodoUser.name)
  async deleteCategoriesTodoUser(@Request() req, @Param('id') id: string) {
    return await this.categoriesService.deleteCategoriesTodoUser(
      req['user'].id,
      +id,
    );
  }
}
