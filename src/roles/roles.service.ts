import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateRoleDto) {
    return this.prisma.role.create({
      data,
    });
  }

  findAll() {
    return this.prisma.role.findMany({
      include: {
        permissions: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
      include: {
        permissions: true,
      },
    });
  }

  update(id: string, data: UpdateRoleDto) {
    return this.prisma.role.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.role.delete({
      where: {
        id,
      },
    });
  }
}
