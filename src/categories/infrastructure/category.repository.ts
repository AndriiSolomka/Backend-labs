import { Injectable } from '@nestjs/common';
import { Category } from '../domain/entities/category.entity';

@Injectable()
export class CategoryRepository {
  private categories: Map<string, Category> = new Map();

  create(category: Category): Category {
    this.categories.set(category.id, category);
    return category;
  }

  findById(id: string): Category | null {
    return this.categories.get(id) || null;
  }

  findAll(): Category[] {
    return Array.from(this.categories.values());
  }

  delete(id: string): boolean {
    return this.categories.delete(id);
  }
}
