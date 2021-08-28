import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.server';
import { UserPostDto } from './user.dto/user-post.dto';
import { UserAuthorizationDto } from './user.dto/user-authorization.dto';
import { UserGuard } from './user.guard';
import { UserUpdateDto } from './user.dto/user-update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGetFilterDto } from './user.dto/user-get-filter.dto';
import { User, nameController } from 'src/lib/name/nameApi/User';
import { RouterName } from '../../decorator/router-name.decorator';

@ApiTags(nameController)
@ApiBearerAuth()
@Controller(nameController)
@UseGuards(UserGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(User.postUser.name)
  @RouterName('postUser')
  postUser(@Body(ValidationPipe) userPostDto: UserPostDto) {
    return this.userService.postUser(userPostDto);
  }

  @Post(User.postUserToken.name)
  @RouterName('postUserToken')
  postUserToken(
    @Body(ValidationPipe) userAuthorizationDto: UserAuthorizationDto,
  ) {
    return this.userService.postUserToken(userAuthorizationDto);
  }

  @Get(User.getUserAll.name)
  @RouterName('getUserAll')
  getUserAll(@Query(null, ValidationPipe) query: UserGetFilterDto) {
    return this.userService.getUserAll(query);
  }

  @Get(User.getUserToken.name)
  @RouterName('getUserToken')
  getUserToken(@Request() req) {
    return this.userService.getUserProfile(req.user);
  }

  @Put(User.updateUserProfile.name)
  @RouterName('updateUserProfile')
  updateUserProfile(
    @Request() req,
    @Body(ValidationPipe) userUpdateDto: UserUpdateDto,
  ) {
    return this.userService.updateUserProfile(req.user.id, userUpdateDto);
  }
}
