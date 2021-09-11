import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsExample } from './components-example.entity';
import { ComponentsExampleController } from './components-example.controller';
import { ComponentsExampleServer } from './components-example.server';
import { ComponentsModule } from '../components/components.module';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentsExample]), ComponentsModule],
  providers: [ComponentsExampleServer],
  controllers: [ComponentsExampleController],
  exports: [ComponentsExampleServer],
})
export class ComponentsExampleModule {}
