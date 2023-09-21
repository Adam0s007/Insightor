import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ArticleEntity } from 'src/article/article.entity';

@Entity('category')
export class CategoryEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(type => ArticleEntity, article => article.categories)
  articles: ArticleEntity[];

    toResponseObject() {
        const { id, name } = this;
        const responseObject = {
        id,
        name,
        };
        return responseObject;
    }
}
