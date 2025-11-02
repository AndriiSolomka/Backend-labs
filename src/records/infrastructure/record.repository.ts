import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Record } from '../domain/entities/record.entity';
import { CreateRecordDto, UpdateRecordDto } from '../presentation/record.dto';

export type RecordFilter = {
  userId?: string;
  categoryId?: string;
};

@Injectable()
export class RecordRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRecordDto): Promise<Record> {
    return this.prisma.record.create({
      data,
      include: {
        user: true,
        category: true,
        currency: true,
      },
    });
  }

  async findById(id: string): Promise<Record | null> {
    return this.prisma.record.findUnique({
      where: { id },
      include: {
        user: true,
        category: true,
        currency: true,
      },
    });
  }

  async findAll(filter: RecordFilter): Promise<Record[]> {
    return this.prisma.record.findMany({
      where: {
        userId: filter.userId,
        categoryId: filter.categoryId,
      },
      include: {
        user: true,
        category: true,
        currency: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, data: UpdateRecordDto): Promise<Record> {
    return this.prisma.record.update({
      where: { id },
      data,
      include: {
        user: true,
        category: true,
        currency: true,
      },
    });
  }

  async delete(id: string): Promise<Record> {
    return this.prisma.record.delete({
      where: { id },
    });
  }
}
