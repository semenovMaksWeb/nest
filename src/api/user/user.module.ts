import { Module } from '@nestjs/common';
import {User} from  "./user.entity"
import {UserService} from "./user.server"
@Module({
  imports: [],
  controllers: [],
  providers: [UserService],
})
export class UserModule {}
