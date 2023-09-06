import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ArticleService } from './article.service';
  import { ArticleDTO } from './article.dto';
  
  @Controller('articles')
  export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}
  
    @Post()
    async create(@Body() articleDto: ArticleDTO) {
      return await this.articleService.create(articleDto);
    }
  
    @Get()
    async findAll() {
      return await this.articleService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.articleService.findOne(id);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() newArticleData: Partial<ArticleDTO>) {
      return await this.articleService.update(id, newArticleData);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // Standardowa odpowiedź dla DELETE to 204 No Content
    async remove(@Param('id') id: string) {
      return await this.articleService.remove(id);
    }

    
  }
  