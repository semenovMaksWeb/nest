import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  MessageBody,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';
import { Server } from 'ws';
import { Observable } from 'rxjs';
import { UseGuards } from '@nestjs/common';
import { UserGuard } from '../user/user.guard';
import { RouterName } from '../../decorator/router-name.decorator';

@WebSocketGateway({ namespace: 'websocket/message' })
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  wsClients = [];

  @RouterName('getMessage')
  @UseGuards(UserGuard)
  @SubscribeMessage('get_message')
  findAll(@MessageBody() data: any) {
    console.log('message');
    this.broadcast('get_message', data);
  }

  afterInit(server: Server) {
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
}
