import { Module } from '@nestjs/common';
import { ContentHtml } from './content-html.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentHtmlServer } from './content-html.server';
import { ContentHtmlController } from './content-html.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContentHtml])],
  controllers: [ContentHtmlController],
  providers: [ContentHtmlServer],
  exports: [ContentHtmlServer],
})
export class ContentHtmlModule {}
