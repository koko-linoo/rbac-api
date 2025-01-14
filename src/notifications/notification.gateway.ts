import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';

@WebSocketGateway({
  cors: {
    origin: '*', // React app URL
    credentials: true,
  },
})
export class NotificationGateway {
  constructor(private readonly prisma: PrismaService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connected')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() { channel }: { channel: string },
  ) {
    client.join(channel);

    this.server.to(channel).emit('connected', { channel });
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @MessageBody()
    message: {
      channel: string;
      user: UserEntity;
      message: string;
    },
  ) {
    this.server.to(message.channel).emit('sendMessage', {
      id: Date.now().toString(),
      ...message,
    });

    this.prisma.message
      .create({
        data: {
          message: message.message,
          userId: message.user.id,
          chatRoomId: message.channel,
        },
      })
      .then((res) => {
        console.log('Message sent successfully', res);
      });
  }
}
