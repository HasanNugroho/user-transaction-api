import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TRANSACTION_REPOSITORY } from 'src/common/constant';
import { ITransactionService } from 'src/domains/service/transaction.service.interface';
import { TransactionModel } from 'src/domains/model/transaction';
import { ITransactionRepository } from 'src/domains/repository/transaction.repository.interface';
import { ProcessTransactionDto } from 'src/presentations/transaction/dto/process-transaction.dto';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async getByUserId(userId: string): Promise<TransactionModel[]> {
    return await this.transactionRepository.getByUserId(userId);
  }

  async process(
    userId: string,
    transactionData: ProcessTransactionDto,
    id: string | undefined,
  ): Promise<TransactionModel> {
    try {
      console.log(id);
      if (id) {
        // update existing transaction
        const existing = await this.transactionRepository.getById(id);
        if (!existing || existing.userId !== userId) {
          throw new NotFoundException('Transaction not found or access denied');
        }

        existing.updateAmount(transactionData.amount ?? existing.amount);
        return this.transactionRepository.update(existing.id, existing);
      } else {
        // create new transaction
        const newTransaction = TransactionModel.create(
          userId,
          transactionData.amount ?? '0',
        );
        return this.transactionRepository.create(newTransaction);
      }
    } catch (error) {
      throw error;
    }
  }
}
