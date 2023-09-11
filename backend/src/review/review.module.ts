import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/article/article.entity';
import { UserEntity } from 'src/user/user.entity';
import { ReviewEntity } from './review.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ArticleEntity,UserEntity,ReviewEntity])],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
