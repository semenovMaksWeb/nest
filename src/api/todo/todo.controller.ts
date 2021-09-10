import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.server';
import { TodoCreateDto } from './todo.dto/todo-create.dto';
import { UserGuard } from '../user/user.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TodoUpdateActiveDto } from './todo.dto/todo-update-active.dto';
import { TodoUpdateDto } from './todo.dto/todo-update.dto';
import { TodoGetFilterDto } from './todo.dto/todo-get-filter.dto';
import { Todo, nameController } from 'src/lib/name/nameApi/Todo';
import { RouterName } from '../../lib/decorator/router-name.decorator';
@Controller(nameController)
@ApiTags(nameController)
@ApiBearerAuth()
@UseGuards(UserGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post(Todo.postTodoUser.name)
  @RouterName('postTodoUser')
  async postTodoUser(
    @Body(ValidationPipe) todoCreateDto: TodoCreateDto,
    @Request() req,
  ) {
    return await this.todoService.postTodoUser(todoCreateDto, req.user.id);
  }

  @Put(Todo.updateTodoUser.name)
  @RouterName('updateTodoUser')
  async updateTodoUser(
    @Param('id') id: string,
    @Body(ValidationPipe) todoUpdateDto: TodoUpdateDto,
  ) {
    return await this.todoService.updateTodoUser(+id, todoUpdateDto);
  }

  @Put(Todo.updateTodoActiveUser.name)
  @RouterName('updateTodoActiveUser')
  async updateTodoActiveUser(
    @Request() req,
    @Param('id') id: string,
    @Body(ValidationPipe)
    todoUpdateActiveDto: TodoUpdateActiveDto,
  ) {
    return await this.todoService.updateTodoActiveUser(
      +id,
      todoUpdateActiveDto,
    );
  }

  @Get(Todo.getTodoUser.name)
  @RouterName('getTodoUser')
  async getTodoUser(
    @Request() req,
    @Query(null, ValidationPipe) query: TodoGetFilterDto,
  ) {
    return await this.todoService.getTodoUser(req.user.id, query);
  }

  @Get(Todo.getTodoAll.name)
  @RouterName('getTodoAll')
  async getTodoAll() {
    return await this.todoService.getTodoAll();
  }
}
