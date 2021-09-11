import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsContent } from './components-content.entity';
import { ComponentsContentServer } from './components-content.server';
import { ComponentsContentController } from './components-content.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentsContent])],
  providers: [ComponentsContentServer],
  controllers: [ComponentsContentController],
  exports: [ComponentsContentServer],
})
export class ComponentsContentModule {}
