import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentEntity } from './content.entity';
import { ContentDTO } from './content.dto';
import { ArticleEntity } from 'src/article/article.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createContentByArticle(ideaId:string,contentData:ContentDTO): Promise<ContentEntity> {
    const article = await this.articleRepository.findOne({ where: { id: ideaId } }
        );
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    
    const content = await this.contentRepository.create(contentData);
    await this.contentRepository.save(content);
    article.content.push(content);
    await this.articleRepository.save(article);
    return content;
  }

  async findAll(): Promise<ContentEntity[]> {
    return await this.contentRepository.find();
  }

  async findOne(id: string): Promise<ContentEntity> {
    const content = await this.contentRepository.findOne({ where: { id } });
    if (!content) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return content;
  }

  async findAllByArticle(articleId: string): Promise<ContentEntity[]> {
    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    return article.content;
  }

  async update(
    id: string,
    newContentData: Partial<ContentDTO>,
  ): Promise<ContentEntity> {
    const content = await this.contentRepository.findOne({ where: { id } });
    Object.assign(content, newContentData);
    return await this.contentRepository.save(content);
  }

  async remove(id: string): Promise<ContentEntity> {
    const content = await this.contentRepository.findOne({ where: { id } });
    await this.contentRepository.delete({id});
    return content;
  }

  async removeAll(): Promise<ContentEntity[]> {
    const content = await this.contentRepository.find();
    await this.contentRepository.delete({});
    return content;
  }


}
