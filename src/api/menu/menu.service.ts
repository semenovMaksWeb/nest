/*
https://docs.nestjs.com/providers#services
*/

import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouterServer } from '../router/router-server';
import { MemuPostDto } from './menu.dto/menu-post.dto';
import { MemuUpdateDto } from './menu.dto/menu-update.dto';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private menuEntity: Repository<Menu>,
        private routerServer: RouterServer,
    ) { }
    //  найти 1 запись меню по
    async menuFindId(id:number){
       return await this.menuEntity.findOne(id);
    }
    //  изменить запись меню
    async menuUpdate(id: number, memuUpdateDto:MemuUpdateDto){
        await this.validateMenuId(id);
        await this.validateAll(memuUpdateDto);
        await this.menuEntity.update(id, {
            link: memuUpdateDto.link,
            name: memuUpdateDto.name,
            parent: memuUpdateDto.parent,
            router: {
                id: memuUpdateDto.routerId
            }
        })
    }

    //  создание списка меню
    async menuPost(memuPostDto: MemuPostDto) {
        await this.validateAll(memuPostDto);
        await this.menuEntity.save({
            link: memuPostDto.link,
            name: memuPostDto.name,
            parent: memuPostDto.parent,
            router: {
                id: memuPostDto.routerId
            }
        })
    }
    //  общая валидация
    async validateAll(memuPostDto: MemuPostDto | MemuUpdateDto){
        await this.validateRouterId(memuPostDto.routerId);
        if (memuPostDto.parent) {
            await this.validateMenuId(memuPostDto.parent);
        }
    }

    //  валидация routerId на наличия
    async validateRouterId(id: number) {
        const router = this.routerServer.findOneRouter(id);
        if (!router) {
            this.error400RouterId();    
        }
    }
    // валидация id menu
    async validateMenuId(id: number) {
        const menu = this.menuFindId(id);
        if (!menu) {
            this.error400ParentId();
        }
    }
    // ошибка 400 что router по id не существует
    error400RouterId() {
        throw new HttpException("router с указанным Id не найдено", HttpStatus.BAD_REQUEST)
    }
      // ошибка 400 что parent меню по id не существует
      error400ParentId() {
        throw new HttpException("menu с указанным Id не найдено", HttpStatus.BAD_REQUEST)
    }
}
