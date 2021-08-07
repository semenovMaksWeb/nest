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
@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
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
  @Get('/all')
  getUserAll(@Query(null, ValidationPipe) query: UserGetFilterDto) {
    console.log(query);
    return this.userService.getUserAll(query);
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
