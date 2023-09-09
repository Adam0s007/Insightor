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

  @Column('text')
  password: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  toResponseObject(showToken: boolean = false): UserRO {
    const { id, created, name, surname, email, token } = this;
    const responseObject: UserRO = { id, created, email, name, surname };
    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const { id, name, surname, created, email } = this;
    return jwt.sign(
      {
        id,
        name,
        surname,
        email,
        created,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }

  
}
