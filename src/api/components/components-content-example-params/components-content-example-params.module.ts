import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsContentExampleParams } from './components-content-example-params.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentsContentExampleParams])],
  providers: [],
  exports: [],
})
export class ComponentsContentExampleParamsModule {}
