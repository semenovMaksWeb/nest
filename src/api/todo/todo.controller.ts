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
@Controller('todo')
@ApiTags('todo')
@ApiBearerAuth()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post()
  @UseGuards(UserGuard)
  async postTodoUser(
    @Body(ValidationPipe) todoCreateDto: TodoCreateDto,
    @Request() req,
  ) {
    console.log(req.user.id);
    return await this.todoService.postTodoUser(todoCreateDto, req.user.id);
  }

  @UseGuards(UserGuard)
  @Put('/:id')
  async updateTodoUser(
    @Request() req,
    @Param('id') id: string,
    @Body(ValidationPipe) todoUpdateDto: TodoUpdateDto,
  ) {
    return await this.todoService.updateTodoUser(
      +id,
      todoUpdateDto,
      req.user.id,
    );
  }

  @UseGuards(UserGuard)
  @Put('/active/:id')
  async updateTodoActiveUser(
    @Request() req,
    @Param('id') id: string,
    @Body(ValidationPipe)
    todoUpdateActiveDto: TodoUpdateActiveDto,
  ) {
    return await this.todoService.updateTodoActiveUser(
      +id,
      todoUpdateActiveDto,
      req.user.id,
    );
  }

  @Get()
  @UseGuards(UserGuard)
  async getTodoUser(
    @Request() req,
    @Query(null, ValidationPipe) query: TodoGetFilterDto,
  ) {
    return await this.todoService.getTodoUser(req.user.id, query);
  }
  @Get('/all')
  async getTodoAll() {
    return await this.todoService.getTodoAll();
  }
}
