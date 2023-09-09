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

  @Column({
    type: 'text',
    unique: true,
  })
  personName: string;

  @Column('text')
  password: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;
  
  toResponseObject(showToken: boolean = false): UserRO {
    const { id, created, personName, email,token } = this;
    const responseObject: UserRO = { id, created,email, personName };
    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const { id, personName, created } = this;
    return jwt.sign(
      {
        id,
        personName,
        created,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}
