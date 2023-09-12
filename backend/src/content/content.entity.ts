import { ArticleEntity } from "src/article/article.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity('content')
export class ContentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  value: string;

  @ManyToOne((type) => ArticleEntity, (article) => article.content)
  article: ArticleEntity;

  
}
