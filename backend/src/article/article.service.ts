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
import {Logger} from '@nestjs/common';
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
    private categoryRepository: Repository<CategoryEntity>,
    private categoryService: CategoryService,
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
    const allCategories = [...existingCategories, ...newCategories];
    const article = await this.articleRepository.create({
      ...articleDto,
      user,
      reviews: [],
      categories: allCategories,
    });
    await this.articleRepository.save(article);
    return article.toResponseObject();
  }

  async findAll(
    max = undefined,
    page: number = 1,
    rating?: number,
    dateFrom?: Date,
    dateTo?: Date,
    authorName?: string,
    authorSurname?: string,
    text?: string,
    category?: string,
    sortBy?: 'date' | 'rating' | 'reviews',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
  ): Promise<ArticleEntity[]> {
    if (max && (max < 1 || isNaN(max))) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const query = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.content', 'content')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.reviews', 'reviews')
      .leftJoinAndSelect('article.categories', 'categoryFilter')
      if (category) {
        query.andWhere('LOWER(categoryFilter.name) = LOWER(:category)', { category });
      }
    
    if (rating) {
      query.andWhere('article.rating = :rating', { rating });
    }

    if (dateFrom) {
      const startDate = new Date(dateFrom);
      startDate.setHours(0, 0, 0, 0); // set time to midnight
      query.andWhere('article.date >= :dateFrom', {
        dateFrom: startDate.toISOString(),
      });
    }
    if (dateTo) {
      const endDate = new Date(dateTo);
      endDate.setHours(23, 59, 59, 999); // set time to the end of the day
      query.andWhere('article.date <= :dateTo', {
        dateTo: endDate.toISOString(),
      });
    }

    if (authorName) {
      query.andWhere('LOWER(user.name) = LOWER(:name)', { name: authorName });
    }
    if (authorSurname) {
      query.andWhere('LOWER(user.surname) = LOWER(:surname)', {
        surname: authorSurname,
      });
    }
    if (text) {
      query.andWhere(
        'article.title ILIKE :text OR article.description ILIKE :text',
        { text: `%${text}%` },
      );
    }

    if (sortOrder !== 'ASC' && sortOrder !== 'DESC') {
      sortOrder = 'DESC';
    }
    switch (sortBy) {
      case 'date':
        query.orderBy('article.date', sortOrder);
        break;
      case 'rating':
      query.orderBy('article.rating', sortOrder);
        break;
      case 'reviews':
        
        query.orderBy('article.reviewsCount', sortOrder);
        break;
      default:
        query.orderBy('article.date', 'DESC'); // Default sort by date
        break;
    }
    if (max) {
      query.take(max);
    } else {
      query.take(3).skip(3 * (page - 1));
    }

    const articles = await query.getMany();
    return articles.map((article) => article.toResponseObject());
  }

  async findArticlesByUser(
    userId: string,
    page: number = 1,
    category?:string,
    sortBy?: 'date' | 'rating' | 'reviews',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
  ): Promise<ArticleEntity[]> {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.reviews', 'reviews')
      .leftJoinAndSelect('article.categories', 'categoryFilter')
      .where('user.id = :userId', { userId });

    if(category){
      query.andWhere('LOWER(categoryFilter.name) = LOWER(:category)', { category });
    }

    if (sortOrder !== 'ASC' && sortOrder !== 'DESC') {
      sortOrder = 'DESC';
    }
    switch (sortBy) {
      case 'date':
        query.orderBy('article.date', sortOrder);
        break;
      case 'rating':
        query.orderBy('article.rating', sortOrder);
        break;
      case 'reviews':
        query.orderBy('article.reviewsCount', sortOrder);
        break;
      default:
        query.orderBy('article.date', 'DESC'); // Default sort by date
        break;
    }
    query.take(6).skip(6 * (page - 1));
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
    let user = undefined;
    if (userId)
      user = await this.userRepository.findOne({
        where: { id: userId },
      });

    const responseObject = article.toResponseObject();
    return { ...responseObject, isOwner };
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

  async update(
    id: string,
    userId: string,
    newArticleData: Partial<ArticleDTO>,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['content', 'user', 'reviews', 'categories'],
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
    let categories = null;
    if (newArticleData.categories) {
      categories = JSON.parse(JSON.stringify(newArticleData.categories));
      delete newArticleData.categories;
    }
    Object.assign(article, newArticleData);
    await this.articleRepository.save(article);
    if (categories) {
      await this.updateCategoriesByArticle(id, categories);
    }
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
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['categories'],
    });

    if (!article) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

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
