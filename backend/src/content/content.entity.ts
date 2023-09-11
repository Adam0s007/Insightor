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

  public toResponseObject(showFull = false) {
    const { id,type, value } = this;
    const responseObject: any = {
      id,
      type,
      value,
    };
    if (showFull) {
      responseObject.article = this.article.toResponseObject();
    }
    return responseObject;
  }
}
