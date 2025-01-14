import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';

@Injectable()
export class ChatRoomsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateChatRoomDto) {
    return this.prisma.chatRoom.create({
      data,
    });
  }

  findAll() {
    return this.prisma.chatRoom.findMany();
  }

  findOne(id: string) {
    return this.prisma.chatRoom.findFirst({
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            user: true,
          },
        },
      },
      where: {
        id,
      },
    });
  }

  update(id: string, data: UpdateChatRoomDto) {
    return this.prisma.chatRoom.update({
      data,
      where: {
        id,
      },
    });
  }
}
