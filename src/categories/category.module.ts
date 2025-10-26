import { Module } from '@nestjs/common';
import { CategoryController } from './presentation/category.controller';
import { CategoryService } from './application/category.service';
import { CategoryRepository } from './infrastructure/category.repository';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
