import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsVar } from './components-var.entity';
import { ComponentsVarServer } from './components-var.server';
import { ComponentsVarController } from './components-var.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentsVar])],
  providers: [ComponentsVarServer],
  controllers: [ComponentsVarController],
  exports: [ComponentsVarServer],
})
export class ComponentsVarModule {}
