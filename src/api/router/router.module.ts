import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Router } from './router.entity';
import { RouterServer } from './router-server';
@Module({
  imports: [TypeOrmModule.forFeature([Router])],
  controllers: [],
  providers: [RouterServer],
  exports: [RouterServer],
})
export class RouterModule {}