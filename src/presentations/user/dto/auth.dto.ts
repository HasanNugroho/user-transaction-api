import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class Credential {
  @ApiProperty({
    description: 'email',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password',
    required: true,
  })
  @IsString()
  password: string;
}
