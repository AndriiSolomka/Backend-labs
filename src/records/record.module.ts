import { Module } from '@nestjs/common';
import { RecordController } from './presentation/record.controller';
import { RecordService } from './application/record.service';
import { UserModule } from '../users/user.module';
import { CategoryModule } from '../categories/category.module';
import { CurrencyModule } from '../currencies/currency.module';
import { RecordRepository } from './infrastructure/record.repository';

@Module({
  imports: [UserModule, CategoryModule, CurrencyModule],
  controllers: [RecordController],
  providers: [RecordService, RecordRepository],
})
export class RecordModule {}
