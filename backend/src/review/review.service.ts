import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/article/article.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ReviewEntity } from './review.entity';

import { ReviewDTO } from './review.dto';
import { Votes } from 'src/shared/votes.enum';

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

  private roundToHalf(value: number): number {
    return Math.round(value * 2) / 2;
  }

  private async computeAverageRating(article: ArticleEntity) {
    const reviews = await this.reviewRepository.find({
      where: { article: { id: article.id } },
    });
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    article.rating = this.roundToHalf(totalRating / reviews.length);
  }

  private async updateArticleRating(id: string) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });
    article.reviewsCount = article.reviews.length;
    await this.computeAverageRating(article);
    await this.articleRepository.save(article);
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
      relations: ['user', 'article', 'upvotes', 'downvotes'],
    });
    return review.toResponseObject();
  }

  async showByArticle(id: string) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: [
        'reviews',
        'reviews.user',
        'reviews.upvotes',
        'reviews.downvotes',
      ],
    });
    return article.reviews.map((review) => review.toResponseObject());
  }

  async showByUser(id: string) {
    const reviews = await this.reviewRepository.find({
      where: { user: { id } },
      relations: ['user', 'article', 'upvotes', 'downvotes'],
    });
    return reviews.map((review) => review.toResponseObject());
  }

  async showAll() {
    const reviews = await this.reviewRepository.find({
      relations: ['user', 'article', 'upvotes', 'downvotes'],
    });
    return reviews.map((review) => review.toResponseObject());
  }

  async create(articleId: string, userId: string, data: ReviewDTO) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['user'],
    });

    await this.ensureUniqueReview(articleId, userId);
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.ensureNotOwner(article, userId);
    const review = await this.reviewRepository.create({
      ...data,
      article,
      user,
    });
    await this.reviewRepository.save(review);
    await this.updateArticleRating(articleId);
    return review.toResponseObject();
  }

  async update(articleId: string, userId: string, data: Partial<ReviewDTO>) {
    let review = await this.reviewRepository.findOne({
      where: { article: { id: articleId }, user: { id: userId } },
      relations: ['user', 'article'],
    });
    if (!review) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(review, userId);

    if (data.content.length < 1) {
      throw new HttpException('No Content!', HttpStatus.BAD_REQUEST);
    }
    await this.reviewRepository.update({ id: review.id }, data);
    review = await this.reviewRepository.findOne({
      where: { article: { id: articleId }, user: { id: userId } },
      relations: ['user', 'article'],
    });
    await this.updateArticleRating(articleId);
    return review.toResponseObject();
  }

  async destroy(articleId: string, userId: string) {
    const review = await this.reviewRepository.findOne({
      where: { article: { id: articleId }, user: { id: userId } },
      relations: ['user', 'article'],
    });
    if (!review) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(review, userId);
    await this.reviewRepository.remove(review);
    await this.updateArticleRating(articleId);
    return review.toResponseObject();
  }

  private async vote(review: ReviewEntity, user: UserEntity, vote: Votes) {
    const opposite = vote === Votes.UP ? Votes.DOWN : Votes.UP;
    if (
      review[opposite].filter((voter) => voter.id === user.id).length > 0 ||
      review[vote].filter((voter) => voter.id === user.id).length > 0
    ) {
      let gaveOppositeVote = review[opposite].some(
        (voter) => voter.id === user.id,
      );
      let gaveSameVote = review[vote].some((voter) => voter.id === user.id);

      if (gaveOppositeVote) {
        review[opposite] = review[opposite].filter(
          (voter) => voter.id !== user.id,
        );
        review[vote].push(user);
      }
      if (gaveSameVote) {
        review[vote] = review[vote].filter((voter) => voter.id !== user.id);
      }

      await this.reviewRepository.save(review);
    } else if (
      review[vote].filter((voter) => voter.id === user.id).length < 1
    ) {
      review[vote].push(user);
      await this.reviewRepository.save(review);
    } else {
      throw new HttpException('Unable to cast vote', HttpStatus.BAD_REQUEST);
    }
    return review;
  }

  async upvote(id: string, userId: string) {
    let review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'upvotes', 'downvotes', 'article'],
    });
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    review = await this.vote(review, user, Votes.UP);
    return review.toResponseObject();
  }

  async downvote(id: string, userId: string) {
    let review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'upvotes', 'downvotes', 'article'],
    });
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    review = await this.vote(review, user, Votes.DOWN);
    return review.toResponseObject();
  }

  async removeArticleReviews(article: ArticleEntity): Promise<void> {
    if (article && article.reviews.length > 0) {
      while (article.reviews.length > 0) {
        await this.reviewRepository.remove(article.reviews.pop());
      }
    }
  }
}
