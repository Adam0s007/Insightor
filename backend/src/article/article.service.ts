import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ContentEntity } from '../content/content.entity';
import { ArticleDTO } from './article.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  toResponseObject(article: ArticleEntity) {
    const responseObject: any = { ...article };
    if (responseObject.user) {
      responseObject.user = responseObject.user.toResponseObject();
    }
    return responseObject;
  }

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
    const article = await this.articleRepository.create({
      ...articleDto,
      user,
    });
    await this.articleRepository.save(article);
    return this.toResponseObject(article);
  }

  async findAll(max = undefined): Promise<ArticleEntity[]> {
    if (max && (max < 1 || isNaN(max))) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    let articles;
    if (max === undefined) {
      articles = await this.articleRepository.find({
        relations: ['content', 'user'],
      });
    } else {
      articles = await this.articleRepository.find({
        relations: ['content', 'user'],
        take: max,
        order: {
          date: 'DESC', // Order by date in descending order
        },
      });
    }
    return articles.map((article) => this.toResponseObject(article));
  }

  async findOne(id: string): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['content', 'user'],
    });
    if (!article) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObject(article);
  }

  async update(
    id: string,
    userId: string,
    newArticleData: Partial<ArticleDTO>,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['content', 'user'],
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

    return this.toResponseObject(article);
  }

  async remove(id: string, userId: string) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['content', 'user'],
    });
    if (!article) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(article, userId);
    console.log(article.content);

    while (article.content.length > 0) {
      await this.contentRepository.remove(article.content.pop());
    }
    await this.articleRepository.delete({ id });

    return this.toResponseObject(article);
  }
}
