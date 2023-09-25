process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://127.0.0.1:4000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }); 
  
  
  await app.listen(port);
  Logger.log(`${process.env.MAX_FILE_SIZE}Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
