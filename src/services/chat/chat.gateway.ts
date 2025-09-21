import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageViewDto } from 'src/types/MessageViewDto';
import * as SendMessageDto from 'src/types/SendMessageDto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly db: PrismaService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // TODO: ADD AUTHENTICATION
  @SubscribeMessage('send_message')
  async handleMessage(client: any, data: SendMessageDto.SendMessageDto) {
    const message = await this.db.messages.create({
      data: {
        text: data.message,
        recipient_id: data.dest_id,
        user_id: data.sender_id,
      },
    });

    return new MessageViewDto(
      message.text,
      message.user_id,
      message.user_id,
      message.created_at,
      message.updated_at,
    );
  }
}
