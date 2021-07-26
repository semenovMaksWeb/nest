import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Categories } from '../categories/categories.entity';
import { Todo } from '../todo/todo.entity';
// import { Todo } from '../todo/todo.entity';

@Injectable()
export class TestService {
  constructor(
    private connection: Connection, // private todoRepository: Repository<Todo>,
  ) {}

  async getTodo() {
    // const todo = await this.connection.query('SELECT * FROM todo');
    // const todo_categories_categories = await this.connection.query(
    //   'SELECT * FROM todo_categories_categories',
    // );
    const getValue = await this.connection
      .createQueryBuilder(Todo, 'todo')
      .select('"todo".id')
      .addSelect('"categories".todoId')
      .innerJoin(Categories, 'categories')
      .getMany()
    return {
      // todo,
      // todo_categories_categories,

      getValue,
    };
  }
}
