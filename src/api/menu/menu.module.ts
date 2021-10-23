import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Menu } from './menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '../router/router.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Menu]),
        RouterModule,
    ],
    controllers: [
        MenuController,
    ],
    providers: [
        MenuService,
    ],
})
export class MenuModule { }
