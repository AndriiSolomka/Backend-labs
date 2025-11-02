import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CurrencyRepository } from '../infrastructure/currency.repository';
import { Currency } from '../domain/entities/currency.entity';
import {
  CreateCurrencyDto,
  UpdateCurrencyDto,
} from '../presentation/currency.dto';

@Injectable()
export class CurrencyService {
  constructor(private repository: CurrencyRepository) {}

  async create(dto: CreateCurrencyDto): Promise<Currency> {
    const existing = await this.repository.findByCode(dto.code);
    if (existing) {
      throw new ConflictException(
        `Currency with code ${dto.code} already exists`,
      );
    }
    return this.repository.create(dto);
  }

  async findAll(): Promise<Currency[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Currency> {
    const currency = await this.repository.findById(id);
    if (!currency) {
      throw new NotFoundException(`Currency with id ${id} not found`);
    }
    return currency;
  }

  async update(id: string, dto: UpdateCurrencyDto): Promise<Currency> {
    await this.findById(id);

    if (dto.code) {
      const existing = await this.repository.findByCode(dto.code);
      if (existing && existing.id !== id) {
        throw new ConflictException(
          `Currency with code ${dto.code} already exists`,
        );
      }
    }

    return this.repository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }
}
