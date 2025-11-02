import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Currency } from '../domain/entities/currency.entity';
import {
  CreateCurrencyDto,
  UpdateCurrencyDto,
} from '../presentation/currency.dto';

@Injectable()
export class CurrencyRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCurrencyDto): Promise<Currency> {
    return this.prisma.currency.create({
      data,
    });
  }

  async findAll(): Promise<Currency[]> {
    return this.prisma.currency.findMany({
      orderBy: {
        code: 'asc',
      },
    });
  }

  async findById(id: string): Promise<Currency | null> {
    return this.prisma.currency.findUnique({
      where: { id },
    });
  }

  async findByCode(code: string): Promise<Currency | null> {
    return this.prisma.currency.findUnique({
      where: { code },
    });
  }

  async update(id: string, data: UpdateCurrencyDto): Promise<Currency> {
    return this.prisma.currency.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Currency> {
    return this.prisma.currency.delete({
      where: { id },
    });
  }
}
