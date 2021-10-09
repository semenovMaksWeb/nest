import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoCreateDto } from './todo.dto/todo-create.dto';
import { CategoriesService } from '../categories/categories.server';
import { TodoUpdateActiveDto } from './todo.dto/todo-update-active.dto';
import { PutValidate } from '../../lib/api/put-validate';
import { TodoUpdateDto } from './todo.dto/todo-update.dto';
import { Pagination } from '../../lib/api/pagination';
import { TodoGetFilterDto } from './todo.dto/todo-get-filter.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private categoriesService: CategoriesService,
  ) {}
  // Создать todo
  async postTodoUser(todoCreateDto: TodoCreateDto, userId: number) {
    todoCreateDto.categories = await this.categoriesService.saveCategoriesTodo(
      todoCreateDto.categories,
    );
    await this.todoRepository.save({ ...todoCreateDto, user: { id: userId } });
    return 'Задача успешно добавлена';
  }
  // изменить активность todo users
  async updateTodoActiveUser(
    id: number,
    todoUpdateActiveDto: TodoUpdateActiveDto,
  ): Promise<string> {
    const result = await this.todoRepository.update(id, {
      active: todoUpdateActiveDto.active,
    });
    return PutValidate({
      validate: result.affected,
      callbackTrue: 'Вы успешно поменяли активность задачи',
      callbackFalse: 'Указанная задача не найдена',
    });
  }
  // изменить todo users
  async updateTodoUser(id: number, todoUpdateDto: TodoUpdateDto) {
    if (await this.getTodoId(id)) {
      todoUpdateDto.categories =
        await this.categoriesService.saveCategoriesTodo(
          todoUpdateDto.categories,
        );
      await this.todoRepository.save({ ...todoUpdateDto, id: id });
      return 'Задача успешно измененна';
    } else {
      this.errors404Todo();
    }
  }
  // получить todo users по todo-id
  async getTodoId(id: number) {
    return await this.todoRepository.findOne({
      where: { id },
      relations: ['categorires'],
    });
  }
  // получить todo users
  async getTodoUser(userId: number, query: TodoGetFilterDto) {
    const { sqlCreate } = this.getTodoFunc(query);
    sqlCreate.where({ user: { id: userId } });
    return await this.getTodoFuncEnd(sqlCreate);
  }
  // получить todo all admin
  async getTodoAll(query: TodoGetFilterDto) {
    const { sqlCreate } = this.getTodoFunc(query);
    return await this.getTodoFuncEnd(sqlCreate);
  }
  // дефолтные параметры получение todos начало запроса
  getTodoFunc(query: TodoGetFilterDto) {
    const { skip, take } = Pagination(query?.limit, query?.page);
    const sqlCreate = this.todoRepository
      .createQueryBuilder('todo')
      .skip(skip)
      .take(take)
      .select([
        'todo.id',
        'categories.id',
        'categories.name',
        'todo.active',
        'todo.title',
        'todo.text',
        'todo.create',
      ]);
    this.addSqlWhereTitle(sqlCreate, query.title);
    this.addSqlWhereActive(sqlCreate, query.active);
    this.addSqlWhereCategories(sqlCreate);
    return { sqlCreate };
  }
  // дефолтные параметры получение todos конец запроса
  async getTodoFuncEnd(sqlCreate: SelectQueryBuilder<Todo>) {
    const [list, count] = await sqlCreate.getManyAndCount();
    return {
      data: list,
      count,
    };
  }
  // add запрос todo поиск по title
  addSqlWhereTitle(sqlCreate: SelectQueryBuilder<Todo>, title?: string) {
    if (title) {
      sqlCreate.andWhere('todo.title LIKE :title', { title: `%${title}%` });
    }
  }
  // add запрос   todo поиск по активности
  addSqlWhereActive(sqlCreate: SelectQueryBuilder<Todo>, active?: boolean) {
    if (active) {
      sqlCreate.andWhere('todo.active= :active', { active: active });
    }
  }
  // add запрос  todo поиск
  addSqlWhereCategories(sqlCreate: SelectQueryBuilder<Todo>) {
    sqlCreate.innerJoin('todo.categories', 'categories');
  }
  // add запрос поиск todo по categories-id
  async addSqlWhereCategoriesId(
    sqlCreate: SelectQueryBuilder<Todo>,
    categoriesId?: string,
  ) {
    if (categoriesId) {
      const categoiresIdArray = categoriesId.split(',').map((e: any) => {
        if (+e !== NaN) {
          return +e;
        } else {
          this.errors400CategoiresId();
        }
      });
      const ids = await this.addSqlInCategories(categoiresIdArray);
      sqlCreate.andWhere(`todo.id IN ${ids}`);
    }
  }
  //  запрос для получение всех todo-ids по categories-id
  addSqlInCategories(categoriesId: number[]) {
    return this.todoRepository.query(
      `SELECT DISTINCT "todo"."id" FROM "user"
      JOIN "todo" ON ("todo"."userId" = "user"."id")
      JOIN "todo_categories" ON ("todo_categories"."todoId" = "todo"."id")
      WHERE "todo_categories"."categoriesId" IN (:categories)
      `,
      [categoriesId],
    );
  }

  errors404Todo() {
    throw new HttpException(
      'Указанная задача не найдена',
      HttpStatus.NOT_FOUND,
    );
  }
  errors400CategoiresId() {
    throw new HttpException(
      'Указанная категория не является числом',
      HttpStatus.BAD_REQUEST,
    );
  }
}
