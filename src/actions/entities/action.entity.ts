import { ApiProperty } from '@nestjs/swagger';
import { Action } from '@prisma/client';

export class ActionEntity implements Action {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  moduleId: string;
}
