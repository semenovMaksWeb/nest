import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsVar } from './components-var.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentsVar])],
  providers: [],
  exports: [],
})
export class ComponentsVarModule {}
