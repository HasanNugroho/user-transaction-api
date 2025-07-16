import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { TRANSACTION_REPOSITORY, USER_REPOSITORY } from 'src/common/constant';
import { UserRepository } from './user.repository';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from '../entity/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Transaction])],
  controllers: [],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: TransactionRepository,
    },
  ],
  exports: [USER_REPOSITORY, TRANSACTION_REPOSITORY],
})
export class RepositoryModule {}
