import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.server';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { TokenModule } from '../token/token.module';
@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
