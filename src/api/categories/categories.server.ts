import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categories } from './categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesGetTodoDto } from './categories.dto/categories-get-todo.dto';
import { CategoriesCreateDto } from './categories.dto/categories-create.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}
  async saveCategoriesTodo(
    categories: CategoriesGetTodoDto[],
  ): Promise<Categories[]> {
    const categoriesMap: CategoriesGetTodoDto[] = categories.map((e) => {
      return {
        id: e.id,
      };
    });
    return await this.categoriesRepository.save(categoriesMap);
  }
  async getCategoriesAll() {
    return await this.categoriesRepository.find();
  }
  async postCategories(categories: CategoriesCreateDto) {
    return await this.categoriesRepository.save(categories);
  }
  async getCategoriesTodoUser(id: number, idCategories: number) {
    const data = await this.categoriesRepository
      .query(`SELECT DISTINCT "todo_categories"."categoriesId" FROM "user"
        JOIN "todo" ON ("todo"."userId" = "user"."id")
        JOIN "todo_categories" ON ("todo_categories"."todoId" = "todo"."id")
        WHERE "user"."id" = :id AND  "todo_categories"."categoriesId" =:idCategories`, [id, idCategories]);
    if (data.length === 0) {
      this.errors403Categories();
    }
  }

  async updateCategoriesTodoUser(
    idUser: number,
    idCategories: number,
    categories: CategoriesCreateDto,
  ) {
    await this.getCategoriesTodoUser(idUser, idCategories);
    await this.categoriesRepository.update(idCategories, categories);
    return 'Категория для задачи успешно измененна!';
  }
  async deleteCategoriesTodoUser(idUser: number, idCategories: number) {
    await this.getCategoriesTodoUser(idUser, idCategories);
    await this.categoriesRepository.delete(idCategories);
    return 'Категория для задачи успешно удалена!';
  }

  errors403Categories() {
    throw new HttpException(
      'Указанная категорию не найдена в вашей коллекции',
      HttpStatus.NOT_FOUND,
    );
  }
}
