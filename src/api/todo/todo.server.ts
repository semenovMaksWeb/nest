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
  async postTodoUser(todoCreateDto: TodoCreateDto, userId: number) {
    todoCreateDto.categories = await this.categoriesService.saveCategoriesTodo(
      todoCreateDto.categories,
    );
    await this.todoRepository.save({ ...todoCreateDto, user: { id: userId } });
    return 'Задача успешно добавлена';
  }
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

  async getTodoId(id: number) {
    return await this.todoRepository.findOne(id);
  }

  async getTodoUser(userId: number, query: TodoGetFilterDto) {
    const { sqlCreate } = this.getTodoFunc(query);
    sqlCreate.where({ user: { id: userId } });
    return await this.getTodoFuncEnd(sqlCreate);
  }
  async getTodoAll(query: TodoGetFilterDto) {
    const { sqlCreate } = this.getTodoFunc(query);
    return await this.getTodoFuncEnd(sqlCreate);
  }

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
  async getTodoFuncEnd(sqlCreate: SelectQueryBuilder<Todo>) {
    const [list, count] = await sqlCreate.getManyAndCount();
    return {
      data: list,
      count,
    };
  }

  addSqlWhereTitle(sqlCreate: SelectQueryBuilder<Todo>, title?: string) {
    if (title) {
      sqlCreate.andWhere('todo.title LIKE :title', { title: `%${title}%` });
    }
  }
  addSqlWhereActive(sqlCreate: SelectQueryBuilder<Todo>, active?: boolean) {
    if (active) {
      sqlCreate.andWhere('todo.active= :active', { active: active });
    }
  }
  addSqlWhereCategories(sqlCreate: SelectQueryBuilder<Todo>) {
    sqlCreate.innerJoin('todo.categories', 'categories');
  }

  errors404Todo() {
    throw new HttpException(
      'Указанная задача не найдена',
      HttpStatus.NOT_FOUND,
    );
  }
}
