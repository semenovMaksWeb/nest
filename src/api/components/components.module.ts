import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Components } from './components.entity';
import { ComponentsVarModule } from './components-var/components-var.module';
import { ComponentsContentModule } from './components-content/components-content.module';
import { ComponentsContentExampleModule } from './components-content-example/components-content-example.module';
import { ComponentsContentExampleParamsModule } from './components-content-example-params/components-content-example-params.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Components]),
    ComponentsVarModule,
    ComponentsContentModule,
    ComponentsContentExampleModule,
    ComponentsContentExampleParamsModule,
  ],
  providers: [],
  exports: [ComponentsVarModule, ComponentsContentModule],
})
export class ComponentsModule {}
