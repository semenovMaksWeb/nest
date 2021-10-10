import { SupportController } from './support.controller';
import { SupportService } from './support.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ContentHtmlModule } from '../content-html/content-html.module';

@Module({
    imports: [
        ContentHtmlModule
    ],
    controllers: [
        SupportController,
    ],
    providers: [
        SupportService,
    ],
})
export class SupportModule { }
