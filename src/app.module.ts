import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { CategoryModule } from './categories/category.module';
import { RecordModule } from './records/record.module';
import { HealthModule } from './helth/health.module';
import { CurrencyModule } from './currencies/currency.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    AuthModule,
    UserModule,
    CategoryModule,
    RecordModule,
    CurrencyModule,
  ],
})
export class AppModule {}
