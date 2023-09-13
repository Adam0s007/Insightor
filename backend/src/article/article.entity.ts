import { ContentEntity } from 'src/content/content.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('article')
export class ArticleEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  title: string;

  @Column()
  description: string;
  
  @Column()
  imgUrl: string;

  @ManyToOne(type => UserEntity, user => user.articles)
  user: UserEntity;

  @OneToMany((type) => ContentEntity, (content) => content.article,{
      cascade: true
  })
  content: ContentEntity[];

  @Column('real')
  rating: number;

  @OneToMany(type => ReviewEntity, review => review.article)
  reviews: ReviewEntity[];
  //it can show only the user's name and surname, for more parameters to show we need argument with boolean values
  toResponseObject(loggedUser = undefined) {
    const { id, date, title, description, rating,content,imgUrl,user,reviews } = this;
    const responseObject: any = {
      id,
      date,
      title,
      description,
      rating,
      imgUrl,
      content,
      user: user.toResponseObject(),
      reviews: reviews.map(review => review.toResponseObject(loggedUser)),
    };
    
    return responseObject;
  }
    
}

