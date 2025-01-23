import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty({
    example: 'User',
  })
  @IsString()
  name: string;

  @ApiProperty({
    isArray: true,
    example: [
      {
        name: 'create',
      },
    ],
  })
  @IsArray()
  actions: CreateActionsDto[];
}

export class CreateActionsDto {
  @ApiProperty({
    example: 'create',
  })
  @IsString()
  name: string;
}
