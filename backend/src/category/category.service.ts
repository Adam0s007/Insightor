import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ArticleEntity } from 'src/article/article.entity';
import { ArticleDTO } from 'src/article/article.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async removeEmptyCategories(): Promise<void> {
    const allCategories = await this.categoryRepository.find({
      relations: ['articles'],
    });
    const emptyCategories = allCategories.filter(
      (category) => category.articles.length === 0,
    );
    await this.categoryRepository.remove(emptyCategories);
  }


  async deleteCategory(id: string) {
    return this.categoryRepository.delete(id);
  }


  private async getCategories(queryParameters: {
    userId?: string;
    limit?: number;
  }) {
    const { userId, limit } = queryParameters;
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.articles', 'article')
      .select('category.name')
      .addSelect('COUNT(article.id) as articleCount')
      .groupBy('category.id')
      .orderBy('articleCount', 'DESC');
    if (userId) {
      queryBuilder.innerJoin('article.user', 'user').where('user.id = :userId', { userId });
    }
    if (limit) {
      queryBuilder.limit(limit);
    }
    const categories = await queryBuilder.getRawMany();
    return categories.map((category) => category.category_name);
  }

  async showAllCategories() {
    return this.getCategories({ limit: 10 });
  }

  async findAllCategoriesByUser(userId: string) {
    return this.getCategories({ userId, limit: 10 });
  }

  async updateCategoriesByArticle(articleDto: ArticleDTO) {
    const existingCategories = await this.categoryRepository.find({
      where: { name: In(articleDto.categories.map((cat) => cat.name)) },
    });
    const existingCategoryNames = existingCategories.map((cat) => cat.name);
    const newCategoryNames = articleDto.categories
      .map((cat) => cat.name)
      .filter((name) => !existingCategoryNames.includes(name));
    const newCategories = this.categoryRepository.create(
      newCategoryNames.map((name) => ({ name })),
    );
    await this.categoryRepository.save(newCategories);
    await this.removeEmptyCategories();
    const allCategories = [...existingCategories, ...newCategories];
    return allCategories;
  }

  extractCategories(newArticleData: Partial<ArticleDTO>): any {
    let categories = null;
    if (newArticleData.categories) {
      categories = JSON.parse(JSON.stringify(newArticleData.categories));
      delete newArticleData.categories;
    }
    return categories;
  }
}
