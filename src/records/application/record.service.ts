import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Record } from '../domain/entities/record.entity';
import { RecordRepository } from '../infrastructure/record.repository';
import { CreateRecordDto, UpdateRecordDto } from '../presentation/record.dto';

import { UserService } from 'src/users/application/user.service';
import { CategoryService } from 'src/categories/application/category.service';
import { CurrencyService } from 'src/currencies/application/currency.service';

@Injectable()
export class RecordService {
  constructor(
    private readonly recordRepository: RecordRepository,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly currencyService: CurrencyService,
  ) {}

  async createRecord(dto: CreateRecordDto): Promise<Record> {
    // Перевіряємо чи існує користувач
    const user = await this.userService.getUserById(dto.userId);

    // Перевіряємо чи існує категорія
    await this.categoryService.getCategoryById(dto.categoryId);

    // Якщо валюта не вказана, використовуємо валюту користувача за замовчуванням
    let currencyId = dto.currencyId;
    if (!currencyId && user.defaultCurrencyId) {
      currencyId = user.defaultCurrencyId;
    }

    // Якщо валюта вказана, перевіряємо чи вона існує
    if (currencyId) {
      await this.currencyService.findById(currencyId);
    }

    return this.recordRepository.create({
      ...dto,
      currencyId,
    });
  }

  async getRecordById(id: string): Promise<Record> {
    const record = await this.recordRepository.findById(id);
    if (!record) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
    return record;
  }

  async getRecords(userId?: string, categoryId?: string): Promise<Record[]> {
    if (!userId && !categoryId) {
      throw new BadRequestException(
        'At least one filter parameter (userId or categoryId) is required',
      );
    }

    return this.recordRepository.findAll({ userId, categoryId });
  }

  async updateRecord(id: string, dto: UpdateRecordDto): Promise<Record> {
    await this.getRecordById(id);

    // Перевіряємо чи існує категорія, якщо вона вказана
    if (dto.categoryId) {
      await this.categoryService.getCategoryById(dto.categoryId);
    }

    // Перевіряємо чи існує валюта, якщо вона вказана
    if (dto.currencyId) {
      await this.currencyService.findById(dto.currencyId);
    }

    return this.recordRepository.update(id, dto);
  }

  async deleteRecord(id: string): Promise<void> {
    await this.getRecordById(id);
    await this.recordRepository.delete(id);
  }
}
