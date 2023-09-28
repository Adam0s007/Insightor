import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { UnverifiedUserEntity } from './unverified-user.entity';
import { EmailService } from 'src/email/email.service';
import { SocialsService } from './socials/socials.service';
import { SocialsEntity } from './socials/socials.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UnverifiedUserEntity, SocialsEntity]),
   
  ],
  controllers: [UserController],
  providers: [UserService, ConfigService, EmailService, SocialsService],
})
export class UserModule {}
