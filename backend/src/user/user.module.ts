import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { UnverifiedUserEntity } from './unverified-user.entity';
import { EmailService } from 'src/email/email.service';



@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,UnverifiedUserEntity])],
  controllers: [UserController],
  providers: [UserService,ConfigService,EmailService]
})
export class UserModule {}
