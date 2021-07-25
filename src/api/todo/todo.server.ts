import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoCreateDto } from './todo.dto/todo-create.dto';
import { CategoriesService } from '../categories/categories.server';
import { TodoUpdateActiveDto } from './todo.dto/todo-update-active.dto';
import { PutValidate } from '../../lib/put-validate';
import { TodoUpdateDto } from './todo.dto/todo-update.dto';
import { Pagination } from '../../lib/pagination';
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
      console.log(todoUpdateDto, id);
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
    const { skip, take } = Pagination(query?.limit, query?.page);
    return await this.todoRepository
      .createQueryBuilder('todo')
      .where({ user: { id: userId } })
      .innerJoinAndSelect('todo.categories', 'categories')
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
      ])
      .getMany();
  }
  async getTodoAll() {
    return await this.todoRepository.find({
      relations: ['categories', 'user'],
    });
  }

  errors404Todo() {
    throw new HttpException(
      'Указанная задача не найдена',
      HttpStatus.NOT_FOUND,
    );
  }
}
