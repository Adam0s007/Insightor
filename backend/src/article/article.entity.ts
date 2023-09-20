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
  AfterLoad,
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

  @Column('real',{default: 0})
  rating: number;

  @Column('int',{default:0})
  reviewsCount:number;

  @OneToMany(type => ReviewEntity, review => review.article)
  reviews: ReviewEntity[];
  
  


  toResponseObject(all=true) {
    const { id, date, title, description, rating,imgUrl,user,reviewsCount } = this;
    const responseObject: any = {
      id,
      date,
      title,
      description,
      rating,
      imgUrl,
      reviewsCount,
      user: user.toResponseObject(),
    };
    if(all){
      responseObject.content= this.content
      responseObject.reviews = this.reviews.map(review => review.toResponseObject())
    }


    return responseObject;
  }
    
}

