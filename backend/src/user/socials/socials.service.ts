import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { SocialsEntity } from './socials.entity';
import { SocialsDTO } from './socials.interface';

@Injectable()
export class SocialsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(SocialsEntity)
    private socialsRepository: Repository<SocialsEntity>,
  ) {}

  async updateSocials(userId: string, data: Partial<SocialsDTO>) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['socials'] });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!user.socials) {
     const socials = await this.socialsRepository.create({...data,user:user});
     user.socials = socials;
     await this.userRepository.save(user);
    } else {
      await this.socialsRepository.update(user.socials.id, data);
    }

    return user.socials.toResponseObject();
  }

  async getSocials(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['socials'] });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const socials = user.socials;
    if (!socials) {
      throw new HttpException('Socials not found', HttpStatus.NOT_FOUND);
    }
    return  socials.toResponseObject();
  }
}
