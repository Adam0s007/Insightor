import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentEntity } from './content.entity';
import { ContentDTO, ContentExtended } from './content.dto';
import { ArticleEntity } from 'src/article/article.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async create(contentData: ContentExtended): Promise<ContentEntity> {
    const article = await this.articleRepository.findOne({ where: { id: contentData.articleId } }
        );
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    const content = await this.contentRepository.create({...contentData, article});
    return await this.contentRepository.save(content);
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
}
