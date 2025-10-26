import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Category } from '../domain/entities/category.entity';
import { CategoryRepository } from '../infrastructure/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  createCategory(name: string): Category {
    const category: Category = {
      id: randomUUID(),
      name,
    };

    return this.categoryRepository.create(category);
  }

  getAllCategories(): Category[] {
    return this.categoryRepository.findAll();
  }

  getCategoryById(id: string): Category {
    const category = this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  deleteCategory(id: string): void {
    const category = this.getCategoryById(id);
    this.categoryRepository.delete(category.id);
  }
}
