import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ContentEntity } from '../content/content.entity';
import { ArticleDTO } from './article.dto';
import { UserEntity } from 'src/user/user.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { CategoryDTO } from 'src/category/category.dto';
import { CategoryService } from 'src/category/category.service';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import { FindOptions } from './FindOptions';
import { ArticleQueryBuilder } from './ArticleQueryBuilder';
import { ContentService } from 'src/content/content.service';
import { ReviewService } from 'src/review/review.service';

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
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly categoryService: CategoryService,
    private readonly contentService:ContentService,
    private readonly reviewService:ReviewService,
   
    private readonly articleQueryBuilder: ArticleQueryBuilder,
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
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const allCategories = await this.categoryService.updateCategoriesByArticle(articleDto);
    
    const article = await this.articleRepository.create({
      ...articleDto,
      user,
      reviews: [],
      categories: allCategories,
    });
    await this.articleRepository.save(article);
    return article.toResponseObject();
  }

  async updatePicture(articleId: string, imgUrl: string) {
    const article = await this.findArticleById(articleId,['content', 'user', 'reviews']);
    if (article.imgUrl) {

      const oldFilePath = `${process.env.Upload_TEMP_DIR}/${article.imgUrl}`;
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
    article.imgUrl = imgUrl;
    await this.articleRepository.save(article);
    return article.toResponseObject();
  }

  async findAll(options: FindOptions): Promise<ArticleEntity[]> {
    const query = this.articleQueryBuilder.createQuery(options);
    const articles = await query.getMany();
    return articles.map((article) => article.toResponseObject());
  }
  
  async findArticlesByUser(userId: string, options: FindOptions): Promise<ArticleEntity[]> {
    const query = this.articleQueryBuilder.createQuery(options, userId);
    const articles = await query.getMany();
    return articles.map((article) => article.toResponseObject());
  }
  
  async findOne(id: string, userId?: string) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: [
        'content',
        'user',
        'categories',
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
    const responseObject = article.toResponseObject();
    if (userId) {
      const reviews =  article.reviews.map(review => {
        const isUpvoted = review.upvotes.some(user => user.id === userId);
        const isDownvoted = review.downvotes.some(user => user.id === userId);
        const upvotes = review.upvotes.length;
        const downvotes = review.downvotes.length;
        return {
          ...review,
          upvotes,
          downvotes,
         isUpvoted,
         isDownvoted
        };
      });
      responseObject.reviews = reviews;
    }
    return { ...responseObject, isOwner };
  }
  

  async update(
    id: string,
    userId: string,
    newArticleData: Partial<ArticleDTO>,
  ): Promise<ArticleEntity> {
    const article = await this.findArticleById(id);
    this.ensureOwnership(article, userId);
    if (newArticleData.content && newArticleData.content.length > 0) {
      await this.contentService.removeArticleContent(article);
    }
    const categories = this.categoryService.extractCategories(newArticleData);
    await this.updateArticleData(article, newArticleData);
    if (categories) {
      await this.updateCategoriesByArticle(id, categories);
    }
    return article.toResponseObject();
  }
  
  private async findArticleById(id: string, relations: string[] = ['content', 'user', 'reviews', 'categories']): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: relations,
    });
    if (!article) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return article;
  }
  
  
  private async updateArticleData(article: ArticleEntity, newArticleData: Partial<ArticleDTO>): Promise<void> {
    Object.assign(article, newArticleData);
    await this.articleRepository.save(article);
  }
  

  async remove(id: string, userId: string) {
    const article = await this.findArticleById(id, ['content', 'user', 'reviews']);
    this.ensureOwnership(article, userId);
    if (article.imgUrl) {
      const oldFilePath = `${process.env.Upload_TEMP_DIR}/${article.imgUrl}`;
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
    await this.contentService.removeArticleContent(article);
    await this.reviewService.removeArticleReviews(article);
    await this.articleRepository.delete({ id });
    await this.categoryService.removeEmptyCategories();
    return article.toResponseObject();
  }

  async getArticlesByCategory(
    categoryId: string,
    page: number = 1,
  ): Promise<ArticleEntity[]> {
    const articles = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.categories', 'category')
      .leftJoinAndSelect('article.content', 'content')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.reviews', 'reviews')
      .where('category.id = :categoryId', { categoryId })
      .take(6)
      .skip(6 * (page - 1))
      .getMany();

    return articles.map((article) => article.toResponseObject());
  }

  async updateCategoriesByArticle(
    articleId: string,
    categoriesDTO: CategoryDTO[],
  ): Promise<ArticleEntity> {
    const article =await this.findArticleById(articleId,['categories']);

    const categoryNames = categoriesDTO.map((category) => category.name);

    const existingCategories = await this.categoryRepository.find({
      where: { name: In(categoryNames) },
    });

    const existingNames = existingCategories.map((cat) => cat.name);
    const newNames = categoryNames.filter(
      (name) => !existingNames.includes(name),
    );

    let newCategories = [];
    for (let name of newNames) {
      const newCategory = this.categoryRepository.create({ name });
      newCategories.push(await this.categoryRepository.save(newCategory));
    }

    article.categories = [...existingCategories, ...newCategories];
    await this.articleRepository.save(article);
    await this.categoryService.removeEmptyCategories();
    return article.toResponseObject(false);
  }
}
