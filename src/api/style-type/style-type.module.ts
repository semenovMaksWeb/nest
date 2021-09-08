import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StyleType } from './style-type.entity';
import { StyleTypeServer } from './style-type.server';

@Module({
  imports: [TypeOrmModule.forFeature([StyleType])],
  controllers: [],
  providers: [StyleTypeServer],
  exports: [StyleTypeServer],
})
export class StyleTypeModule {}
