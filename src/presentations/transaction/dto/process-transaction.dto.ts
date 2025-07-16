import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ProcessTransactionDto {
  @ApiProperty({
    description: 'password',
    required: true,
  })
  @IsNumber()
  amount: number;
}
