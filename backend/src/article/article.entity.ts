import { ContentEntity } from 'src/content/content.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
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
  personName: string;

  @Column()
  img: string;

  @OneToMany((type) => ContentEntity, (content) => content.article,{
      cascade: true
  })
  content: ContentEntity[];

  @Column()
  rating: number;
}

