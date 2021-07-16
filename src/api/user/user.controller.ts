import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.server';
import { UserPostDto } from './user.dto/user-post.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  postUser(@Body(ValidationPipe) userPostDto: UserPostDto) {
    return this.userService.postUser(userPostDto);
  }
  @Get()
  getUserAll() {
    return this.userService.getUserAll();
  }
}
