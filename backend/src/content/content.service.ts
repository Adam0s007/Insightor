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

  validateType(contentData: Partial<ContentDTO>) {
    const allowedTypes = ['paragraph', 'image'];
    if (contentData.type && !allowedTypes.includes(contentData.type)) {
      throw new HttpException(
        'Content type not allowed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async createContentByArticle(
    articleId: string,
    contentData: ContentDTO,
  ): Promise<ContentEntity> {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['content'],
    });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    this.validateType(contentData);
    const content = await this.contentRepository.create({
      ...contentData,
      article,
    });
    await this.contentRepository.save(content);
    return content;
  }

  async findAll(): Promise<ContentEntity[]> {
    return await this.contentRepository.find({ relations: ['article'] });
  }

  async findOne(id: string): Promise<ContentEntity> {
    const content = await this.contentRepository.findOne({
      where: { id },
      relations: ['article'],
    });
    if (!content) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return content;
  }

  async findAllByArticle(articleId: string): Promise<ContentEntity[]> {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['content'],
    });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    return article.content;
  }

  async update(
    id: string,
    newContentData: Partial<ContentDTO>,
  ): Promise<ContentEntity> {
    const content = await this.contentRepository.findOne({
      where: { id },
    });
    this.validateType(newContentData);
    Object.assign(content, newContentData);
    return await this.contentRepository.save(content);
  }

  async updateAllByArticle(
    articleId: string,
    newContentData: ContentDTO[],
  ): Promise<ContentEntity[]> {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['content'],
    });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    if (
      newContentData.length === article.content.length &&
      newContentData.every((content, index) => {
        return (
          content.type === article.content[index].type &&
          content.value === article.content[index].value
        );
      })
    ) {
      return article.content;
    }

    while (article.content.length > 0) {
      await this.contentRepository.remove(article.content.pop());
    }

    for (const contentData of newContentData) {
      const content = await this.contentRepository.create(contentData);
      await this.contentRepository.save(content);
      article.content.push(content);
      await this.articleRepository.save(article);
    }

    return article.content;
  }

  async remove(id: string): Promise<ContentEntity> {
    const content = await this.contentRepository.findOne({ where: { id } });
    await this.contentRepository.delete({ id });
    return content;
  }

  async removeAll(): Promise<ContentEntity[]> {
    const content = await this.contentRepository.find();
    await this.contentRepository.delete({});
    return content;
  }

  async removeArticleContent(article: ArticleEntity): Promise<void> {
    if (article && article.content.length > 0) {
      while (article.content.length > 0) {
        await this.contentRepository.remove(article.content.pop());
      }
    }
  }
}
