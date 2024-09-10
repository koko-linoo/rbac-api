import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: {
          select: {
            id: true,
            name: true,
            permissions: {
              select: {
                roleId: true,
                module: true,
                action: true,
              },
            },
          },
        },
      },
    });
  }

  findOneByName(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
