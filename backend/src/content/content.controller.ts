import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentDTO } from './content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('article/:id')
  async createContentByArticle(@Param('id') articleId,@Body() contentData: ContentDTO) {
    return await this.contentService.createContentByArticle(articleId,contentData);
  }

  @Get('article/:id')
  async findAllByArticle(@Param('id') articleId) {
    return await this.contentService.findAllByArticle(articleId);
  }

  @Get()
  async findAll() {
    return await this.contentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.contentService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() newContentData: Partial<ContentDTO>) {
    return await this.contentService.update(id, newContentData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.contentService.remove(id);
  }

  @Delete()
  async removeAll(){
    return await this.contentService.removeAll();
  }
}
