import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty()
  @IsString()
  name: string;
}
