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


  @ManyToOne(type => UserEntity, user => user.articles)
  user: UserEntity;

  @OneToMany((type) => ContentEntity, (content) => content.article,{
      cascade: true
  })
  content: ContentEntity[];

  @Column('real')
  rating: number;

  @OneToMany(type => ReviewEntity, review => review.article, {cascade: true})
  reviews: ReviewEntity[];
  //it can show only the user's name and surname, for more parameters to show we need argument with boolean values
  toResponseObject(showFull = false) {
    const { id, date, title, description, rating } = this;
    const responseObject: any = {
      id,
      date,
      title,
      description,
      rating,
      
    };
    if (showFull) {
      if(this.user)
        responseObject.user = this.user.toResponseObject();
      if(this.content)
        responseObject.content = this.content.map(content => content.toResponseObject());
      if(this.reviews)
        responseObject.reviews = this.reviews.map(review => review.toResponseObject());
    }
    return responseObject;
  }
    
  

}

