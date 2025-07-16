import { TransactionModel } from '../model/transaction';

export interface ITransactionRepository {
  create(transaction: TransactionModel): Promise<TransactionModel>;
  update(
    id: string,
    data: Partial<TransactionModel>,
  ): Promise<TransactionModel>;
  getByUserId(userId: string): Promise<TransactionModel[]>;
  getById(id: string): Promise<TransactionModel | null>;
}
