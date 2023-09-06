import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, JoinTable } from 'typeorm';

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

  @OneToMany(type => ContentEntity, content => content.article)
  content: ContentEntity[];

  @Column()
  rating: number;
}

@Entity('content')
export class ContentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  value: string;

  @ManyToOne(type => ArticleEntity, article => article.content)
  article: ArticleEntity;
}
