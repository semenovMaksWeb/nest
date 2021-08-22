import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Router } from './router.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Router])],
  controllers: [],
  providers: [],
  exports: [],
})
export class RouterModule {}
