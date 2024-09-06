import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateActionDto {
  @IsString()
  @ApiProperty({
    example: 'User-create',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'e711645f-5d13-43ee-9ee7-daa48f0023bc',
  })
  moduleId: string;
}
