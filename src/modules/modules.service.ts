import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateModuleDto) {
    return this.prisma.module.create({
      data,
    });
  }

  findAll() {
    return this.prisma.module.findMany();
  }

  findOne(id: string) {
    return this.prisma.module.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, data: UpdateModuleDto) {
    return this.prisma.module.update({
      where: {
        id,
      },
      data,
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
