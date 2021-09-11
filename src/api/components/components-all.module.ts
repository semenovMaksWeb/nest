import { Module } from '@nestjs/common';
import { ComponentsVarModule } from './components-var/components-var.module';
import { ComponentsContentModule } from './components-content/components-content.module';
import { ComponentsExampleModule } from './components-example/components-example.module';
import { ComponentsContentExampleParamsModule } from './components-content-example-params/components-content-example-params.module';

@Module({
  imports: [
    ComponentsVarModule,
    ComponentsContentModule,
    ComponentsExampleModule,
    ComponentsContentExampleParamsModule,
  ],
  providers: [],
  exports: [],
})
export class ComponentsAllModule {}
