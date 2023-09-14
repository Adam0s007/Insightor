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
      password: '1910008', // Uwaga: Zastanów się nad przechowywaniem hasła w bezpiecznym miejscu
      username: 'postgres',
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