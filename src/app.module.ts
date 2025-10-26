import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { CategoryModule } from './categories/category.module';
import { RecordModule } from './records/record.module';
import { HealthModule } from './helth/health.module';

@Module({
  imports: [HealthModule, UserModule, CategoryModule, RecordModule],
})
export class AppModule {}
