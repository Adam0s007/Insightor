import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDTO } from './article.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';
import { WeakAuthGuard } from 'src/shared/weak-auth.guard';

import { CategoryDTO,  } from 'src/category/category.dto';
import { multerOptions } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindOptions } from './FindOptions';
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  async create(@User('id') user: string, @Body() articleDto: ArticleDTO) {
    return await this.articleService.create(user, articleDto);
  }

  @Put(':id/imgUrl')
  @UseGuards(new AuthGuard())
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions))
  async uploadProfilePicture(@UploadedFile() file, @Param('id') artcleId: string) {
    console.log(file)
    return this.articleService.updatePicture(artcleId, file.filename);
  }

  @Get()
  async findAll(
    @Query('max') max?: number,
    @Query('page') page?: number,
    @Query('text') text?: string,
    @Query('category') category?: string,
    @Query('sort') sortBy?: 'date' | 'rating' | 'reviews',
    @Query('order') sortOrder?: 'ASC' | 'DESC',
  ) {
    return await this.articleService.findAll(
      new FindOptions(max, page, text, category, sortBy, sortOrder)
    );
  }

  @Get('user/:id')
  async ShowArticlesByUser(
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('category') category?: string,
    @Query('sort') sortBy?: 'date' | 'rating' | 'reviews',
    @Query('order') sortOrder?: 'ASC' | 'DESC',
  ) {
    return await this.articleService.findArticlesByUser(
      id,
      new FindOptions(undefined, page, undefined, category, sortBy, sortOrder)
    );
  }

  @Get(':id')
  @UseGuards(new WeakAuthGuard())
  async findOne(@Param('id') id: string, @User('id') user?: string) {
    return await this.articleService.findOne(id, user);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @User('id') user: string,
    @Body() newArticleData: Partial<ArticleDTO>,
  ) {
    return await this.articleService.update(id, user, newArticleData);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  async remove(@Param('id') id: string, @User('id') user: string) {
    return await this.articleService.remove(id, user);
  }

  @Get('/category/:categoryId')
  async getByCategory(
    @Param('categoryId') categoryId: string,
    @Query('page') page?: number,
  ) {
    return await this.articleService.getArticlesByCategory(categoryId, page);
  }

  

}
