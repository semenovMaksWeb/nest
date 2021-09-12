import { Module } from '@nestjs/common';
import { ComponentsVarModule } from './components-var/components-var.module';
import { ComponentsContentModule } from './components-content/components-content.module';
import { ComponentsExampleModule } from './components-example/components-example.module';
import { ComponentsExampleParamsModule } from './components-example-params/components-example-params.module';

@Module({
  imports: [
    ComponentsVarModule,
    ComponentsContentModule,
    ComponentsExampleModule,
    ComponentsExampleParamsModule,
  ],
  providers: [],
  exports: [],
})
export class ComponentsAllModule {}
