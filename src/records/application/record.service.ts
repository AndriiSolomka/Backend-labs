import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Record } from '../domain/entities/record.entity';
import { RecordRepository } from '../infrastructure/record.repository';

import { UserService } from 'src/users/application/user.service';
import { CategoryService } from 'src/categories/application/category.service';

@Injectable()
export class RecordService {
  constructor(
    private readonly recordRepository: RecordRepository,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  createRecord(userId: string, categoryId: string, amount: number): Record {
    const user = this.userService.getUserById(userId);

    const category = this.categoryService.getCategoryById(categoryId);

    const record: Record = {
      id: randomUUID(),
      userId: user.id,
      categoryId: category.id,
      amount,
      createdAt: new Date(),
    };

    return this.recordRepository.create(record);
  }

  getRecordById(id: string): Record {
    const record = this.recordRepository.findById(id);
    if (!record) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
    return record;
  }

  getRecords(userId?: string, categoryId?: string): Record[] {
    if (!userId && !categoryId) {
      throw new BadRequestException(
        'At least one filter parameter (userId or categoryId) is required',
      );
    }

    return this.recordRepository.findAll({ userId, categoryId });
  }

  deleteRecord(id: string): void {
    const record = this.getRecordById(id);
    this.recordRepository.delete(record.id);
  }
}
