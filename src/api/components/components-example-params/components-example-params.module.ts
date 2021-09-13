import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsContentExampleParams } from './components-example-params.entity';
import { ComponentsVarModule } from '../components-var/components-var.module';
import { ComponentsContentModule } from '../components-content/components-content.module';
import { ComponentsExampleParamsServer } from './components-example-params.server';
import { ComponentsExampleParamsController } from './components-example-params.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ComponentsContentExampleParams]),
    ComponentsVarModule,
    ComponentsContentModule,
  ],
  providers: [ComponentsExampleParamsServer],
  controllers: [ComponentsExampleParamsController],
  exports: [ComponentsExampleParamsServer],
})
export class ComponentsExampleParamsModule {}
