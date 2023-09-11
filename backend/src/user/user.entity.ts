import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.dto';
import { ArticleEntity } from 'src/article/article.entity';
import { Exclude } from 'class-transformer';
//without 'user' this table will be named 'user_entity
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  created: Date;

  @Column('text')
  name: string;
  @Column('text')
  surname: string;
  
  @Exclude()
  @Column('text')
  password: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;


  @OneToMany(type => ArticleEntity, article => article.user)
  articles: ArticleEntity[];

  toResponseObject(showToken: boolean = false): UserRO {
    const { id, created, name, surname, email, token,articles } = this;
    const responseObject: UserRO = { id, created, email, name, surname };
    if (showToken) {
      responseObject.token = token;
    }
    if (articles) {
      responseObject.articles = articles;
    }
    return responseObject;
  
}

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const { id, name, surname, email } = this;
    return jwt.sign(
      {
        id,
        name,
        surname,
        email
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }

  
}
