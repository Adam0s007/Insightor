import { ArticleEntity } from "src/article/article.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('review')
export class ReviewEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @CreateDateColumn()
    created:Date;

    @Column('text')
    content:string;

    @Column('real')
    rating:number;

    @ManyToOne(type=>UserEntity)
    @JoinTable()
    user:UserEntity;
    
    @ManyToOne(type=>ArticleEntity,article => article.reviews, { nullable: true })
    article: ArticleEntity;

    toResponseObject(showArticle=false) {
        const { id, created, content, rating } = this;
        const responseObject: any = {
          id,
          created,
          content,
          rating,
        };
        if(this.user){
          responseObject.user = this.user.toResponseObject();
        }
        
        if(showArticle && this.article){
          responseObject.article = this.article.toResponseObject();
        }
        return responseObject;
      }
}