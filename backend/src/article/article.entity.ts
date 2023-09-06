import { ContentEntity } from 'src/content/content.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  JoinTable,
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

  @OneToMany((type) => ContentEntity, (content) => content.article, {
    eager: true,
  })
  content: ContentEntity[];

  @Column()
  rating: number;
}

