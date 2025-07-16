import { Module } from '@nestjs/common';
import {
  AUTH_SERVICE,
  TRANSACTION_SERVICE,
  USER_SERVICE,
} from 'src/common/constant';
import { UserService } from './user.service';
import { RepositoryModule } from 'src/infrastructures/repository/repository.module';
import { AuthService } from './auth.service';
import { TransactionService } from './transaction.service';

@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: TRANSACTION_SERVICE,
      useClass: TransactionService,
    },
  ],
  exports: [AUTH_SERVICE, USER_SERVICE, TRANSACTION_SERVICE],
})
export class ServiceModule {}
