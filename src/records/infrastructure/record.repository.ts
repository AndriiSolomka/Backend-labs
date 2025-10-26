import { Injectable } from '@nestjs/common';
import { Record } from '../domain/entities/record.entity';

export type RecordFilter = {
  userId?: string;
  categoryId?: string;
};

@Injectable()
export class RecordRepository {
  private records: Map<string, Record> = new Map();

  create(record: Record): Record {
    this.records.set(record.id, record);
    return record;
  }

  findById(id: string): Record | null {
    return this.records.get(id) || null;
  }

  findAll(filter: RecordFilter): Record[] {
    return Array.from(this.records.values()).filter((record) =>
      Object.entries(filter)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value != null)
        .every(([key, value]) => record[key] === value),
    );
  }

  delete(id: string): boolean {
    return this.records.delete(id);
  }
}
