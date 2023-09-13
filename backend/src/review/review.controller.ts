import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { ReviewDTO } from './review.dto';
import { User } from 'src/user/user.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get('article/:id')
  showReviewsByArticle(@Param('id') article: string) {
    return this.reviewService.showByArticle(article);
  }

  @Get('user/:id')
  showReviewsByUser(@Param('id') user: string) {
    return this.reviewService.showByUser(user);
  }

  @Get()
  showAllReviews() {
    return this.reviewService.showAll();
  }

  @Post('article/:id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createReview(
    @Param('id') article: string,
    @User('id') user: string,
    @Body() data: ReviewDTO,
  ) {
    return this.reviewService.create(article, user, data);
  }

  @Put('article/:id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateReview(
    @Param('id') article: string,
    @User('id') user: string,
    @Body() data: Partial<ReviewDTO>,
  ) {
    return this.reviewService.update(article, user, data);
  }

  @Get(':id')
  showReview(@Param('id') id: string) {
    return this.reviewService.show(id);
  }

  @Delete('article/:id')
  @UseGuards(new AuthGuard())
  destroyReview(@Param('id') id: string, @User('id') user: string) {
    return this.reviewService.destroy(id, user);
  }


  @Post(':id/upvote')
  @UseGuards(new AuthGuard())
  upvoteReview(@Param('id') id: string, @User('id') user: string) {
    return this.reviewService.upvote(id,user);
  }

  @Post(':id/downvote')
  @UseGuards(new AuthGuard())
  downvoteReview(@Param('id') id: string, @User('id') user: string) {
    return this.reviewService.downvote(id,user);
  }
}
