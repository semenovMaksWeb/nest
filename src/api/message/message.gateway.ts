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

@WebSocketGateway({ namespace: 'websocket/message' })
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  @SubscribeMessage('get_message')
  findAll(@MessageBody() data: any): number {
    console.log('message');
    return 1;
  }

  afterInit(server: Server) {
    console.log('afterInit');
  }

  handleConnection(client: Socket) {
    console.log('handleConnection');
  }

  handleDisconnect(client: Socket) {
    console.log('handleDisconnect');
  }
}
