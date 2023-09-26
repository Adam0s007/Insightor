import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ArticleEntity } from 'src/article/article.entity';

@Injectable()
export class CategoryService {
    
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
      ) {}
    
      async removeEmptyCategories(): Promise<void> {
        const allCategories = await this.categoryRepository.find({ relations: ['articles'] });
        const emptyCategories = allCategories.filter(category => category.articles.length === 0);
        await this.categoryRepository.remove(emptyCategories);
    }
    
    async showAllCategories() {
      const categories = await this.categoryRepository.createQueryBuilder("category")
        .leftJoin("category.articles", "article")
        .select("category")
        .addSelect("COUNT(article.id) as articleCount")
        .groupBy("category.id")
        .orderBy("articleCount", "DESC")
        .limit(10)
        .getRawMany(); 
      return categories;   
    }

    async deleteCategory(id:string){
        await this.categoryRepository.delete(id);
        return this.showAllCategories();
    }

    async findAllCategoriesByUser(userId: string) {
      const articles = await this.articleRepository.find({
        where: { user: { id: userId } },
        relations: ['categories'],
      });
      let categories = new Set();
      articles.forEach((article) => {
        article.categories.forEach((category) => {
          categories.add(category.name);
        });
      });
      
      return [...categories];
    }

}
