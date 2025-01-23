import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateModuleDto) {
    return this.prisma.module.create({
      data: {
        name: data.name,
        actions: {
          create: data.actions,
        },
      },
    });
  }

  findAll() {
    return this.prisma.module.findMany({
      include: {
        actions: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.module.findUnique({
      where: {
        id,
      },
      include: {
        actions: true,
      },
    });
  }

  update(id: string, data: UpdateModuleDto) {
    return this.prisma.module.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    });
  }

  remove(id: string) {
    return this.prisma.module.delete({
      where: {
        id,
      },
    });
  }
}
