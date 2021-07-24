import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.server';
import { UserPostDto } from './user.dto/user-post.dto';
import { UserAuthorizationDto } from './user.dto/user-authorization.dto';
import { UserGuard } from './user.guard';
import { UserUpdateDto } from './user.dto/user-update.dto';
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

  @Get('profile')
  @UseGuards(UserGuard)
  getUserToken(@Request() req) {
    return this.userService.getUserProfile(req.user);
  }

  @Put('profile')
  @UseGuards(UserGuard)
  updateUserProfile(
    @Request() req,
    @Body(ValidationPipe) userUpdateDto: UserUpdateDto,
  ) {
    return this.userService.updateUserProfile(req.user.id, userUpdateDto);
  }
}
