import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsContent } from './components-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentsContent])],
  providers: [],
  exports: [],
})
export class ComponentsContentModule {}
