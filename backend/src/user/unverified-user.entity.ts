import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.dto';
@Entity('unverifiedUser')
export class UnverifiedUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  created: Date;

  @Column('text')
  name: string;
  @Column('text')
  surname: string;

  @Column('text')
  password: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column()
  verificationCode: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = false): UserRO {
    const { id, created, name, surname, email } = this;
    const responseObject: UserRO = { id, created, name, surname, email };
    return responseObject;
  }
}
