import { ApiProperty } from '@nestjs/swagger';

export class ResponseTokenDTO {
  @ApiProperty()
  access_token: string;
}
