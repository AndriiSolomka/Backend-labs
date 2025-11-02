import { Module } from '@nestjs/common';
import { CurrencyController } from './presentation/currency.controller';
import { CurrencyService } from './application/currency.service';
import { CurrencyRepository } from './infrastructure/currency.repository';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, CurrencyRepository],
  exports: [CurrencyService],
})
export class CurrencyModule {}
