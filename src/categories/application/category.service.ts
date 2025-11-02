import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../domain/entities/category.entity';
import { CategoryRepository } from '../infrastructure/category.repository';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../presentation/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.create(dto);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async updateCategory(id: string, dto: UpdateCategoryDto): Promise<Category> {
    await this.getCategoryById(id);
    return this.categoryRepository.update(id, dto);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.getCategoryById(id);
    await this.categoryRepository.delete(id);
  }
}
