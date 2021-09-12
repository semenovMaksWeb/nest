import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsContentExampleParams } from './components-example-params.entity';
import { ComponentsVarModule } from '../components-var/components-var.module';
import { ComponentsContentModule } from '../components-content/components-content.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ComponentsContentExampleParams]),
    ComponentsVarModule,
    ComponentsContentModule,
  ],
  providers: [],
  exports: [],
})
export class ComponentsExampleParamsModule {}
