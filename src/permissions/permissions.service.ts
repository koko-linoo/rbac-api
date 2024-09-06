import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreatePermissionDto) {
    return this.prisma.permission.create({
      data,
    });
  }

  findAll() {
    return this.prisma.permission.findMany();
  }

  findOne(id: string) {
    return this.prisma.permission.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, data: UpdatePermissionDto) {
    return this.prisma.permission.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.permission.delete({
      where: {
        id,
      },
    });
  }
}
