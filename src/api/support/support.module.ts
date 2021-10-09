import { SupportController } from './support.controller';
import { SupportService } from './support.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        SupportController,
    ],
    providers: [
        SupportService,
    ],
})
export class SupportModule { }
