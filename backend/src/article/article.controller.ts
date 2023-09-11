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
  UsePipes,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDTO } from './article.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  async create(@User('id') user: string, @Body() articleDto: ArticleDTO) {
    return await this.articleService.create(user, articleDto);
  }

  @Get()
  async findAll(@Query('max') max?: number) {
    return await this.articleService.findAll(max);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @User('id') user: string, @Body() newArticleData: Partial<ArticleDTO>) {
    return await this.articleService.update(id, user, newArticleData);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  async remove(@Param('id') id: string, @User('id') user: string) {
    return await this.articleService.remove(id, user);
  }
}
