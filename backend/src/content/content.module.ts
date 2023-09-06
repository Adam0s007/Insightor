import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentEntity } from './content.entity';
import { ArticleEntity } from 'src/article/article.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ContentEntity,ArticleEntity])
  ],
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule {}
