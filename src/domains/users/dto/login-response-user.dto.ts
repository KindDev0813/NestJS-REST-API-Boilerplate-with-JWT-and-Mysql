import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsAlphanumeric,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class LoginResponseUsersDTO {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  @MaxLength(25)
  name: string;
}
