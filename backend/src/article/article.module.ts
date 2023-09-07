import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { ContentEntity } from '../content/content.entity';
import { ContentService } from 'src/content/content.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([ArticleEntity,ContentEntity])
  ],
  controllers: [ArticleController],
  providers: [ArticleService,ContentService]
})
export class ArticleModule {}
