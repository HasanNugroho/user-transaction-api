import { UserModel } from './user';

export class TransactionModel {
  id: string;
  userId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  user?: Pick<UserModel, 'id' | 'name' | 'email'>;

  static create(userId: string, amount: number): TransactionModel {
    const transaction = new TransactionModel();
    transaction.userId = userId;
    transaction.amount = amount;
    transaction.createdAt = new Date();
    transaction.updatedAt = new Date();
    return transaction;
  }

  updateAmount(amount: number) {
    this.amount = amount;
    this.updatedAt = new Date();
  }
}
