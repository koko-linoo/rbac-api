import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  currentPage: number;
}
