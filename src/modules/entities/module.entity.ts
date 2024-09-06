import { ApiProperty } from '@nestjs/swagger';
import { Module } from '@prisma/client';

export class ModuleEntity implements Module {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
