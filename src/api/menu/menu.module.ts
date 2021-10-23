import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        MenuController,
    ],
    providers: [
        MenuService,
    ],
})
export class MenuModule { }
