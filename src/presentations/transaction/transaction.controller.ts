import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  HttpCode,
  HttpStatus,
  Query,
  Inject,
} from '@nestjs/common';
import { HttpResponse } from 'src/common/dto/response.dto';
import { TransactionModel } from 'src/domains/model/transaction';
import { ProcessTransactionDto } from './dto/process-transaction.dto';
import { ITransactionService } from 'src/domains/service/transaction.service.interface';
import { TRANSACTION_SERVICE } from 'src/common/constant';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('transaction')
@ApiBearerAuth()
export class TransactionController {
  constructor(
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: ITransactionService,
  ) {}

  @Get()
  async getAllByUser(
    @Req() req: any,
  ): Promise<HttpResponse<TransactionModel[]>> {
    const userId = req.user.id;
    const transactions = await this.transactionService.getByUserId(userId);

    return {
      success: true,
      message: 'Transaction history retrieved successfully',
      data: transactions,
    };
  }

  @Post('process')
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'Transaction ID to update',
  })
  @ApiBody({ type: ProcessTransactionDto })
  @HttpCode(HttpStatus.OK)
  async process(
    @Req() req: any,
    @Query('id') id: string | undefined,
    @Body() dto: ProcessTransactionDto,
  ): Promise<HttpResponse<TransactionModel>> {
    const userId = req.user.id;
    const transaction = await this.transactionService.process(userId, dto, id);

    return {
      success: true,
      message: id
        ? 'Transaction updated successfully'
        : 'Transaction created successfully',
      data: transaction,
    };
  }
}
