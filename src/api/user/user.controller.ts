import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.server';
import { UserPostDto } from './user.dto/user-post.dto';
import { UserAuthorizationDto } from './user.dto/user-authorization.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  postUser(@Body(ValidationPipe) userPostDto: UserPostDto) {
    return this.userService.postUser(userPostDto);
  }
  @Post('authorization')
  postUserToken(@Body(ValidationPipe) userAuthorizationDto: UserAuthorizationDto) {
    return this.userService.postUserToken(userAuthorizationDto);
  }
  @Get()
  getUserAll() {
    return this.userService.getUserAll();
  }
}
