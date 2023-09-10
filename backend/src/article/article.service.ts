import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ContentEntity } from '../content/content.entity';
import { ArticleDTO } from './article.dto';
import { ContentService } from 'src/content/content.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
    private readonly contentService: ContentService,
  ) {}

  toResponseObject(article: ArticleEntity) {
    const responseObject: any = { ...article };
    if (responseObject.content) {
      responseObject.content = responseObject.content.map(content => ({
        ...content,
      }));
    }
    return responseObject;
  }

  async create(articleDto: ArticleDTO) {
    if(articleDto.content.length === 0) {
      throw new HttpException('Content should not be empty!', HttpStatus.BAD_REQUEST);
    }
    let article = new ArticleEntity();
    
    Object.assign(article, articleDto); // or you can use some library like class-transformer to convert DTO to entity
    const savedArticle = await this.articleRepository.save(article);

    for (let contentData of articleDto.content) {
      await this.contentService.createContentByArticle(savedArticle.id, contentData);
    }
    

    return savedArticle;
  }

  async findAll(max=undefined): Promise<ArticleEntity[]> {
    if(max === undefined){
      return await this.articleRepository.find({
        relations: ['content'],
      });
    }
    if(max < 1 || isNaN(max)){
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    else{
      return await this.articleRepository.find({
        relations: ['content'],
        take: max,  
        order: {
          date: 'DESC',  // Order by date in descending order
        },
      });
    }
    
  }

  async findOne(id: string): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['content'],
    });
    if (!article) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return article;
  }

  async update(id: string, newArticleData: Partial<ArticleDTO>): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['content'],
    });
    if (!article) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if(newArticleData.content && newArticleData.content.length > 0) {
      while(article.content.length > 0) {
        await this.contentRepository.remove(article.content.pop());
      }
    }
    // Aktualizacja głównych danych artykułu
    Object.assign(article, newArticleData);
    await this.articleRepository.save(article);


    return article;
  }

  async remove(id: string): Promise<ArticleEntity[]> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['content'],
    });
    if (!article) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    console.log(article.content);

    while (article.content.length > 0) {
      console.log("tu sie wykonuję!")
      await this.contentRepository.remove(article.content.pop());
    }
    await this.articleRepository.delete({ id });
    
    const articles:ArticleEntity[] = await this.articleRepository.find({
      relations: ['content'],
    });

    return articles;
  }
}
