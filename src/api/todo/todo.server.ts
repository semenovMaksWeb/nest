import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @Inject('todoRepository')
    private todoRepository: Repository<Todo>,
  ) {}
}