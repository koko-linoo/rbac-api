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

  async updatePermissionsWithRoleId(
    roleId: string,
    data: UpdatePermissionDto[],
  ) {
    await this.prisma.permission.deleteMany({
      where: {
        roleId,
      },
    });

    return this.prisma.permission.createMany({
      data: data.map((item) => ({
        action: item.action,
        module: item.module,
        roleId,
      })),
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
