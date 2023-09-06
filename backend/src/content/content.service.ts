import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentEntity } from './content.entity';
import { ContentDTO } from './content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
  ) {}

  async create(contentData: ContentDTO): Promise<ContentEntity> {
    const content = new ContentEntity();
    Object.assign(content, contentData);
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
