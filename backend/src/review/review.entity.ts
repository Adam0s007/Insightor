import { ArticleEntity } from "src/article/article.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


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
    
    @ManyToOne(type=>ArticleEntity,article => article.reviews,{cascade:true})
    article: ArticleEntity;


    @ManyToMany(type=>UserEntity,{cascade:true})
    @JoinTable()
    upvotes:UserEntity[];

    @ManyToMany(type=>UserEntity,{cascade:true})
    @JoinTable()
    downvotes:UserEntity[];

    toResponseObject(user = undefined) {
        const { id, created, content, rating,article } = this;
        const responseObject: any = {
          id,
          created,
          content,
          rating,
          article
        };
        if(this.user){
          responseObject.user = this.user.toResponseObject();
        }
        if(this.upvotes){
          responseObject.upvotes = this.upvotes.length;
        }
        if(this.downvotes){
          responseObject.downvotes = this.downvotes.length;
        }
        
        //jesli user jest zdefiniowany (czyli zalogowany)
        if (user && user instanceof UserEntity) {
          responseObject.upvoted = this.upvotes.some(upvote => upvote.id === user.id);
          responseObject.downvoted = this.downvotes.some(downvote => downvote.id === user.id);
        }
        return responseObject;
      }
}