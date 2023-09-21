import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async showAllCategories() {
    return await this.categoryService.showAllCategories();
  }

  @Delete(":id")
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }

  @Get('user/:id')
  async findAllCategoriesByUser(@Param('id') id: string) {
    return await this.categoryService.findAllCategoriesByUser(id);
  }
}
