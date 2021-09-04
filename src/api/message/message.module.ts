import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { ChatModule } from '../chat/chat.module';
import { MessageServer } from './message.server';
import { MessageController } from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), ChatModule],
  controllers: [MessageController],
  providers: [MessageServer],
  exports: [MessageServer],
})
export class MessageModule {}
