import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { ContentEntity } from '../content/content.entity';
import { ContentService } from 'src/content/content.service';
import { UserEntity } from 'src/user/user.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([ArticleEntity,ContentEntity,UserEntity,ReviewEntity,CategoryEntity])
  ],
  controllers: [ArticleController],
  providers: [ArticleService,ContentService,CategoryService]
})
export class ArticleModule {}
