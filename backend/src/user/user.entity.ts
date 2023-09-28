import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.dto';
import { ArticleEntity } from 'src/article/article.entity';
import { Exclude } from 'class-transformer';
import { SocialsEntity } from './socials/socials.entity';
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

  @OneToOne(() => SocialsEntity, socials => socials.user,{cascade:true})
  @JoinColumn()
  socials: SocialsEntity;

  
  @Column({ type: 'text', nullable: true })
  description: string;

  //make column with name profile picture and type text and it can be nullable
  @Column({ type: 'text', nullable: true })
  profilePicture: string;
  

  @OneToMany(type => ArticleEntity, article => article.user)
  articles: ArticleEntity[];

  toResponseObject(showToken: boolean = false): UserRO {
    const { id, created, name, surname, email, token,articles,description,profilePicture,socials } = this;
    const responseObject: UserRO = { id, created, email, name, surname,description,profilePicture };
    if (showToken) {
      responseObject.token = token;
    }
    if (articles) {
      responseObject.articles = articles;
    }
    if (socials) {
      responseObject.socials = socials.toResponseObject();
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
