import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';
import { Server } from 'ws';

import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserGuard } from '../user/user.guard';
import { RouterName } from '../../lib/decorator/router-name.decorator';
import { MessageServer } from './message.server';
import { MessageGetFilterDto } from './message.dto/message-get-filter.dto';
import { MessagePost } from './message.dto/message-post';

@WebSocketGateway({ namespace: 'websocket/message' })
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageServer: MessageServer) {}
  @WebSocketServer() server: Server;

  wsClients = [];

  @UsePipes(new ValidationPipe())
  @UseGuards(UserGuard)
  @RouterName('getMessage')
  @SubscribeMessage('get_message')
  async findAll(
    @MessageBody() data: MessageGetFilterDto,
    @ConnectedSocket() client: Socket,
  ) {
    return await this.messageServer.getMessage(
      client['user'],
      data,
      +client.handshake.query.id,
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(UserGuard)
  @RouterName('postMessage')
  @SubscribeMessage('post_message')
  async setBody(
    @MessageBody() data: MessagePost,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messageServer.postMessage(
      client['user'],
      +client.handshake.query.id,
      data,
    );
    this.broadcast('get_message', message);
  }

  // новое сообщение для всех
  //

  afterInit() {
    console.log('afterInit');
  }

  handleConnection(client: Socket) {
    // add users
    this.wsClients.push(client);
    console.log(this.wsClients.length);
  }

  handleDisconnect(client: Socket) {
    // удаление users
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
    console.log('handleDisconnect');
  }

  private broadcast(event, data: any) {
    for (const client of this.wsClients) {
      client.emit(event, data);
    }
  }
  // validateFindAll(body: any) {
  //   if (
  //     body.id === undefined ||
  //     body.id === null ||
  //     body.id.toString() === ''
  //   ) {
  //     throw new WsException('id чата обязательное поле');
  //   }
  //   if (typeof body.id !== 'number') {
  //     throw new WsException('id чата является числом');
  //   }
  //   // this.messageServer.getMessage();
  // }
}
