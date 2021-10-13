import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsAlphanumeric,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class UsersDTO {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  id: number;

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
