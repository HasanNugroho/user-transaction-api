import { ProcessTransactionDto } from 'src/presentations/transaction/dto/process-transaction.dto';
import { TransactionModel } from '../model/transaction';

export interface ITransactionService {
  getByUserId(userId: string): Promise<TransactionModel[]>;
  process(
    userId: string,
    transactionData: ProcessTransactionDto,
    id: string | undefined,
  ): Promise<TransactionModel>;
}
