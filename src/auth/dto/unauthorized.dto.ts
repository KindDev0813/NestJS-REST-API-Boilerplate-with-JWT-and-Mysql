import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedDTO {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
