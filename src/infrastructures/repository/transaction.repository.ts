import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ITransactionRepository } from 'src/domains/repository/transaction.repository.interface';
import { TransactionModel } from 'src/domains/model/transaction';
import { Transaction } from '../entity/transaction.entity';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly db: Repository<Transaction>,
  ) {}

  async create(transaction: TransactionModel): Promise<TransactionModel> {
    try {
      const transactionEntity = await this.db.save(transaction as any);
      return this.toTransaction(transactionEntity as Transaction);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getById(id: string): Promise<TransactionModel | null> {
    const transactionEntity = await this.db.findOne({ where: { id } });
    if (!transactionEntity) return null;
    return this.toTransaction(transactionEntity);
  }

  async getByUserId(userId: string): Promise<TransactionModel[]> {
    const transactionEntities = await this.db.find({
      where: { userId },
      select: {
        id: true,
        amount: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
          email: true,
          name: true,
        },
      },
      relations: ['user'],
    });
    return transactionEntities.map(this.toTransaction);
  }

  async update(
    id: string,
    data: Partial<TransactionModel>,
  ): Promise<TransactionModel> {
    const existingTransaction = await this.db.findOne({ where: { id } });

    if (!existingTransaction) {
      throw new NotFoundException('Transaction not found');
    }

    try {
      const dataForEntity = plainToInstance(Transaction, data) as any;
      const updatedTransaction = this.db.merge(
        existingTransaction,
        dataForEntity,
      );
      const transactionEntity = await this.db.save(updatedTransaction);
      return this.toTransaction(transactionEntity);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private toTransaction(transactionEntity: Transaction): TransactionModel {
    return plainToInstance(TransactionModel, transactionEntity);
  }
}
