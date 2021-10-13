import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlphanumeric, MaxLength } from 'class-validator';

export class BaseUsersDTO {
  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  @MaxLength(25)
  name: string;

  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  @MaxLength(25)
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
