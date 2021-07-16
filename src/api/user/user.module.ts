import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.server';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
