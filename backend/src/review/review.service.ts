import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/Article/Article.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ReviewEntity } from './Review.entity';

import { ReviewDTO } from './Review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  toResponseObject(review: ReviewEntity) {
    const responseObject: any = review;
    if (review.user) {
      responseObject.user = review.user.toResponseObject();
    }
    if (review.article) {
      responseObject.article = review.article.toResponseObject();
    }
    return responseObject;
  }

  private ensureOwnership(review: ReviewEntity, userId: string) {
    if (review.user.id !== userId) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }
  }

  private ensureNotOwner(article: ArticleEntity, userId: string) {
    if (article.user.id === userId) {
      throw new HttpException(
        'You cannot review your own article',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  //user can only review an article once
  private async ensureUniqueReview(articleId: string, userId: string) {
    const review = await this.reviewRepository.findOne({
      where: { article: { id: articleId }, user: { id: userId } },
    });
    if (review) {
      throw new HttpException(
        'You have already reviewed this article',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async show(id: string) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'article'],
    });
    return this.toResponseObject(review);
  }

  async showByArticle(id: string) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['reviews', 'reviews.user', 'reviews.article'],
    });
    return article.reviews.map((review) => this.toResponseObject(review));
  }

  async showByUser(id: string) {
    const reviews = await this.reviewRepository.find({
      where: { user: { id } },
      relations: ['user'],
    });
    return reviews.map((review) => this.toResponseObject(review));
  }

  async showAll() {
    const reviews = await this.reviewRepository.find({
      relations: ['user', 'article'],
    });
    return reviews.map((review) => this.toResponseObject(review));
  }

  async create(articleId: string, userId: string, data: ReviewDTO) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['user'],
    });
    this.ensureNotOwner(article, userId);
    await this.ensureUniqueReview(articleId, userId);
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const review = await this.reviewRepository.create({
      ...data,
      article,
      user,
    });
    await this.reviewRepository.save(review);
    return this.toResponseObject(review);
  }

  async update(id: string, userId: string, data: Partial<ReviewDTO>) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'article'],
    });
    this.ensureOwnership(review, userId);
    await this.reviewRepository.update({ id }, data);
    return this.toResponseObject(review);
  }

  async destroy(id: string, userId: string) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'article'],
    });
    this.ensureOwnership(review, userId);
    await this.reviewRepository.remove(review);
    return this.toResponseObject(review);
  }
}
