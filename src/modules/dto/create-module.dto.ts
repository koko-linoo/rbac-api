import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty({
    example: 'User',
  })
  @IsString()
  name: string;
}
