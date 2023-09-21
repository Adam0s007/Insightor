import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { ArticleModule } from './article/article.module';
import { ContentModule } from './content/content.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { ReviewModule } from './review/review.module';
import { DatabaseModule } from './database.module'; 
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    DatabaseModule, 
    ArticleModule,
    ContentModule,
    UserModule,
    EmailModule,
    ReviewModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/temp'),
    }),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor  
    },
  ],
})
export class AppModule {}
