import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user.entity';
import { SocialsDTO } from './socials.interface';

@Entity('socials')
export class SocialsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  facebook: string;

  @Column({ type: 'text', nullable: true })
  twitter: string;

  @Column({ type: 'text', nullable: true })
  youtube: string;

  @Column({ type: 'text', nullable: true })
  instagram: string;

  @Column({ type: 'text', nullable: true })
  linkedin: string;

  @OneToOne(() => UserEntity, (user) => user.socials)
  @JoinColumn()
  user: UserEntity;

    toResponseObject(): SocialsDTO {
        const { facebook, twitter, youtube, instagram, linkedin } = this;
        const responseObject: SocialsDTO = {
        facebook,
        twitter,
        youtube,
        instagram,
        linkedin,
        };
        return responseObject;
    }
  
}
