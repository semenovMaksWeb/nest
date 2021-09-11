import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsContentExample } from './components-content-example.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentsContentExample])],
  providers: [],
  exports: [],
})
export class ComponentsContentExampleModule {}
