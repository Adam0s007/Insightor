import { FindOptions } from './FindOptions';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ArticleQueryBuilder {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
    ) {}

  createQuery(options: FindOptions, userId?: string): any {
    const { max, page, text, category, sortBy, sortOrder } = options;

    const query = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.content', 'content')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.reviews', 'reviews')
      .leftJoinAndSelect('article.categories', 'categoryFilter');

    if (userId) {
      query.andWhere('user.id = :userId', { userId });
    }

    if (category) {
      query.andWhere('LOWER(categoryFilter.name) = LOWER(:category)', { category });
    }

    if (text) {
      query.andWhere(
        'article.title ILIKE :text OR article.description ILIKE :text OR user.name ILIKE :text OR user.surname ILIKE :text',
        { text: `%${text}%` },
      );
    }

    const orderSort = ['ASC', 'DESC'].includes(sortOrder) ? sortOrder : 'DESC';
    const orderBy = {
      date: 'article.date',
      rating: 'article.rating',
      reviews: 'article.reviewsCount',
    }[sortBy] || 'article.date';

    query.orderBy(orderBy, orderSort);

    if (max) {
      query.take(max);
    } else {
      const take = userId ? 6 : 3;
      query.take(take).skip(take * ((page || 1) - 1));
    }

    return query;
  }
}
