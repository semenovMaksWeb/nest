import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Router } from './router.entity';
import { RouterServer } from './router-server';
import { RouterController } from './router.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Router])],
  controllers: [RouterController],
  providers: [RouterServer],
  exports: [RouterServer],
})
export class RouterModule {}
