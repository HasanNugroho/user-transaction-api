import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionSource } from './infrastructures/config/database.config';
import { ServiceModule } from './applications/service/service.module';
import { RepositoryModule } from './infrastructures/repository/repository.module';
import { AuthController } from './presentations/user/auth.controller';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { AuthGuard } from './applications/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { TransactionController } from './presentations/transaction/transaction.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development', '.env'],
    }),
    TypeOrmModule.forRoot(connectionSource.options),
    ServiceModule,
    RepositoryModule,
  ],
  controllers: [AuthController, TransactionController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    HttpExceptionFilter,
  ],
})
export class AppModule {}
