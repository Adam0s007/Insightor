import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
    
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
      ) {}
    
      async removeEmptyCategories(): Promise<void> {
        const allCategories = await this.categoryRepository.find({ relations: ['articles'] });
        const emptyCategories = allCategories.filter(category => category.articles.length === 0);
        await this.categoryRepository.remove(emptyCategories);
    }
    
    async showAllCategories() {
        return  await this.categoryRepository.find({
            relations: ['articles'],
        }); 
      }

    async deleteCategory(id:string){
        await this.categoryRepository.delete(id);
        return this.showAllCategories();
    }
}
