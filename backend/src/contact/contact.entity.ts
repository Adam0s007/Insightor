import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('contact')
  export class ContactEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    created: Date;
  
    @Column('text')
    email: string;
  
    @Column('text')
    message: string;
  }
  