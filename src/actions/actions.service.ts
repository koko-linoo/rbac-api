import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';

@Injectable()
export class ActionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateActionDto) {
    return this.prisma.action.create({
      data,
    });
  }

  findAll() {
    return this.prisma.action.findMany();
  }

  findOne(id: string) {
    return this.prisma.action.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, data: UpdateActionDto) {
    return this.prisma.action.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.action.delete({
      where: {
        id,
      },
    });
  }
}
