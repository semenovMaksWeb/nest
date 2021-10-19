import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Categories } from './categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesGetTodoDto } from './categories.dto/categories-get-todo.dto';
import { CategoriesCreateDto } from './categories.dto/categories-create.dto';
import { CategoriesCreateAdminDto } from './categories.dto/categories-create-admin.dto';
import { TypeCategories } from 'src/interface/type-categories.type';
import { Type } from 'class-transformer';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}
  //  сохранить категории пользователю по todo
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
  //  получить все категории
  async getCategoriesAll() {
    return await this.categoriesRepository.find();
  }
  //  сохранить категории пользователю all
  async postCategories(categories: CategoriesCreateDto) {  
    return await this.categoriesRepository.save({
      name: categories.name
    });
  }
    //  сохранить категории пользователю admin
  async categoriesPostAdmin(categories:CategoriesCreateAdminDto){
    console.log(categories);  
    return await this.categoriesRepository.save({
      name: categories.name,
      type: categories.type,
    });
  }
  //  получить категории типа support
  async categoriesSupport(){
    return await this.categoriesRepository.find({
      where:{
        type: TypeCategories.support
      }
    })
  }

  convertStringToArrayIds(categories:string){
    const categoiresIdArray = categories.split(',').map((e: any) => {
      if (+e !== NaN) {
        return +e;
      } else {
        this.errors400CategoriesInIds();
      }
    });
    return categoiresIdArray;
  }

  // получить (валидация) id категории если категория является вашей по todo
  async getCategoriesTodoUser(id: number, idCategories: number) {
    const data = await this.categoriesRepository.query(
      `SELECT DISTINCT "todo_categories"."categoriesId" FROM "user"
        JOIN "todo" ON ("todo"."userId" = "user"."id")
        JOIN "todo_categories" ON ("todo_categories"."todoId" = "todo"."id")
        WHERE "user"."id" = :id AND  "todo_categories"."categoriesId" =:idCategories`,
      [id, idCategories],
    );
    if (data.length === 0) {
      this.errors403Categories();
    }
  }
  // изменить категорию по todo
  async updateCategoriesTodoUser(
    idUser: number,
    idCategories: number,
    categories: CategoriesCreateDto,
  ) {
    await this.getCategoriesTodoUser(idUser, idCategories);
    await this.categoriesRepository.update(idCategories, categories);
    return 'Категория для задачи успешно измененна!';
  }
  //  удалить категории по todo
  async deleteCategoriesTodoUser(idUser: number, idCategories: number) {
    await this.getCategoriesTodoUser(idUser, idCategories);
    await this.categoriesRepository.delete(idCategories);
    return 'Категория для задачи успешно удалена!';
  }
  async categoriesValidateTypeSupport(ids:number[]){
    const categoiresAll  = await this.categoriesRepository.find({
      where: {
        id: In(ids)
      }
    })
    if (ids.length !== categoiresAll.length) {
      this.errors404CategoriesInIds();
    }
    if (categoiresAll.filter((e)=> e.type !== TypeCategories.support)[0]) {
      this.errors400CategoriesInIds();      
    }
  }
  // ошибка это не ваша категория работа с ней запрещена
  errors403Categories() {
    throw new HttpException(
      'Указанная категорию не найдена в вашей коллекции',
      HttpStatus.NOT_FOUND,
    );
  }
  errors404CategoriesInIds(){
    throw new HttpException(
      'Не все указанные категории были найдены',
      HttpStatus.NOT_FOUND,
    );
  }
  errors400CategoriesInIds() {
    throw new HttpException(
      'Указанные категории не являются категории поддержки',
      HttpStatus.BAD_REQUEST,
    );
  }
}
