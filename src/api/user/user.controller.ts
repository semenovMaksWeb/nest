import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  ValidationPipe,
} from '@nestjs/common';
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
  postUserToken(
    @Body(ValidationPipe) userAuthorizationDto: UserAuthorizationDto,
  ) {
    return this.userService.postUserToken(userAuthorizationDto);
  }
  @Get()
  getUserAll() {
    return this.userService.getUserAll();
  }
  @Get('/token')
  async getUserToken(@Headers() headers) {
    return await this.userService.getUserToken(headers.authorization);
  }
}
