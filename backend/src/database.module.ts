// database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      url:process.env.DATABASE_URL,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      //dropSchema: true,
      database: 'blog',
      synchronize: true,
      logging: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
