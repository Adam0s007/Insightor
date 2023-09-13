import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ContentEntity } from '../content/content.entity';
import { ArticleDTO } from './article.dto';
import { UserEntity } from 'src/user/user.entity';
import { ReviewEntity } from 'src/review/review.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}

  private ensureOwnership(article: ArticleEntity, userId: string) {
    if (article.user.id !== userId) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }
  }

  async create(userId: string, articleDto: ArticleDTO) {
    if (articleDto.content.length === 0) {
      throw new HttpException(
        'Content should not be empty!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const article = await this.articleRepository.create({
      ...articleDto,
      user,
      reviews: [],
    });
    await this.articleRepository.save(article);
    return article.toResponseObject();
  }

  async findAll(max = undefined): Promise<ArticleEntity[]> {
    if (max && (max < 1 || isNaN(max))) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    let articles;
    if (max === undefined) {
      articles = await this.articleRepository.find({
        relations: ['content', 'user', 'reviews'],
      });
    } else {
      articles = await this.articleRepository.find({
        relations: ['content', 'user', 'reviews'],
        take: max,
        order: {
          date: 'DESC', // Order by date in descending order
        },
      });
    }
    return articles.map((article) => article.toResponseObject());
  }

  async findOne(id: string, userId?: string) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: [
        'content',
        'user',
        'reviews',
        'reviews.user',
        'reviews.upvotes',
        'reviews.downvotes',
      ],
    });
    if (!article) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    let isOwner = false;
    if (userId) {
      isOwner = article.user.id === userId;
    }
    let user = undefined;
    if (userId)
      user = await this.userRepository.findOne({
        where: { id: userId },
      });

    const responseObject = article.toResponseObject(user);
    return { ...responseObject, isOwner };
  }

  async update(
    id: string,
    userId: string,
    newArticleData: Partial<ArticleDTO>,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['content', 'user', 'reviews'],
    });
    if (!article) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(article, userId);

    if (newArticleData.content && newArticleData.content.length > 0) {
      while (article.content.length > 0) {
        await this.contentRepository.remove(article.content.pop());
      }
    }
    // Aktualizacja głównych danych artykułu
    Object.assign(article, newArticleData);
    await this.articleRepository.save(article);

    return article.toResponseObject();
  }

  async remove(id: string, userId: string) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['content', 'user', 'reviews'],
    });
    if (!article) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(article, userId);
    console.log(article.content);

    while (article.content.length > 0) {
      await this.contentRepository.remove(article.content.pop());
    }
    while (article.reviews.length > 0) {
      await this.reviewRepository.remove(article.reviews.pop());
    }
    await this.articleRepository.delete({ id });

    return article.toResponseObject();
  }
}
