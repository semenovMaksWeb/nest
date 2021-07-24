import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoCreateDto } from './todo.dto/todo-create.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}
  async postTodoUser(todoCreateDto: TodoCreateDto, userId: number) {
    console.log(todoCreateDto);
    await this.todoRepository.save({ ...todoCreateDto });
  }
  async getTodoUser(userId: number) {
    return await this.todoRepository.find({ where: { user: { id: userId } } });
  }
}
