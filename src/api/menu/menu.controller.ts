/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RouterName } from 'src/lib/decorator/router-name.decorator';
import { nameController, Menu } from 'src/lib/name/nameApi/Menu';
import { UserGuard } from '../user/user.guard';
import { MemuPostDto } from './menu.dto/menu-post.dto';
import { MemuUpdateDto } from './menu.dto/menu-update.dto';
import { MenuService } from './menu.service';

@Controller()
@ApiTags(nameController)
@ApiBearerAuth()
@UseGuards(UserGuard)
export class MenuController {
    constructor(private readonly menuService: MenuService) { }
    @Post(Menu.menuPost.name)
    @RouterName('menuPost')
    async menuPost(@Body() memuPostDto: MemuPostDto) {
        return await this.menuService.menuPost(memuPostDto);
    }

    @Put(Menu.menuUpdate.name)
    @RouterName('menuPost')
    async menuUpdate(@Param('id') id: string, @Body(ValidationPipe) memuUpdateDto: MemuUpdateDto) {
        return await this.menuService.menuUpdate(+id, memuUpdateDto);
    }
}
