import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Components } from './components.entity';
import { ComponentsVarModule } from './components-var/components-var.module';
import { ComponentsContentModule } from './components-content/components-content.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Components]),
    ComponentsVarModule,
    ComponentsContentModule,
  ],
  providers: [],
  exports: [ComponentsVarModule, ComponentsContentModule],
})
export class ComponentsModule {}
