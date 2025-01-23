import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import { PaginationQueryDto } from 'src/commons/dtos/pagination-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPaginatedResponseDto } from './dto/user-paginated-response.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ password, ...createUserDto }: CreateUserDto) {
    const hashedPassword = await hash(password, 10);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async findAll({
    page,
    limit,
    search,
  }: PaginationQueryDto): Promise<UserPaginatedResponseDto> {
    const where: Prisma.UserWhereInput = {
      OR: search && [
        {
          username: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
        {
          fullName: {
            contains: search,
          },
        },
      ],
    };

    const totalCount = await this.prisma.user.count({
      where,
    });

    const data = await this.prisma.user.findMany({
      skip: page && limit && (page - 1) * limit,
      take: limit && limit,
      where,
      omit: {
        password: true,
      },
      include: {
        role: true,
      },
    });

    return {
      data: data as UserEntity[],
      totalCount,
      currentPage: page,
    };
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
    return this.prisma.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email: username,
          },
        ],
      },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      omit: { password: true },
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
