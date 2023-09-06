import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';


import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { ArticleModule } from './article/article.module';
import { ContentModule } from './content/content.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '1910008',
    username: 'postgres',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    database: 'blog',
    synchronize: true,
    logging: true,
  }), ArticleModule, ContentModule],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_FILTER,
    useClass:HttpErrorFilter

  }, {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor  
  }
],
})
export class AppModule {}