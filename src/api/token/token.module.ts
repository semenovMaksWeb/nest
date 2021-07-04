import { Module } from '@nestjs/common';
import {Token} from  "./token.entity"
import {TokenService} from "./token.server"
@Module({
  imports: [],
  controllers: [],
  providers: [TokenService],
})
export class TokenModule {}
