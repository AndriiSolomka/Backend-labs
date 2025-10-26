import { Controller, Get, Post, Delete, Body, Query } from '@nestjs/common';
import { CategoryService } from '../application/category.service';
import { CreateCategoryDto, CategoryResponseDto } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): CategoryResponseDto[] {
    return this.categoryService.getAllCategories();
  }

  @Post()
  createCategory(@Body() { name }: CreateCategoryDto): CategoryResponseDto {
    return this.categoryService.createCategory(name);
  }

  @Delete()
  deleteCategory(@Query('id') id: string): void {
    return this.categoryService.deleteCategory(id);
  }
}
