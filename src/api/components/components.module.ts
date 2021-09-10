import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Components } from './components.entity';
import { ComponentsVarModule } from './components-var/components-var.module';

@Module({
  imports: [TypeOrmModule.forFeature([Components]), ComponentsVarModule],
  providers: [],
  exports: [ComponentsVarModule],
})
export class ComponentsModule {}
