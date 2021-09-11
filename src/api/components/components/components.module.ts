import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Components } from './components.entity';
import { ComponentsServer } from './components.server';

@Module({
  imports: [TypeOrmModule.forFeature([Components])],
  controllers: [],
  providers: [ComponentsServer],
  exports: [ComponentsServer],
})
export class ComponentsModule {}
