import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { LoginUserDTO, UserDTO, UserRO, UserUpdateDTO } from './user.dto';
import { UnverifiedUserEntity } from './unverified-user.entity';
import { EmailService } from 'src/email/email.service';
import * as fs from 'fs';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UnverifiedUserEntity)
    private unverifiedUserRepository: Repository<UnverifiedUserEntity>,
    private emailService: EmailService,
  ) {}

  async generateVerificationCode(): Promise<string> {
    return Math.floor(100007 + Math.random() * 900000).toString();
  }
  async showAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find({
      relations: ['articles', 'articles.content'],
    });
    return users.map((user) => user.toResponseObject(true));
  }

  async showUser(userId: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['articles', 'articles.content'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user.toResponseObject(true);
  }

  async login(data: LoginUserDTO): Promise<UserRO> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject(true);
  }
  async register(data: UserDTO): Promise<UserRO> {
    const { email } = data;
    // Check if user with the same email exists
    const userByEmail = await this.userRepository.findOne({ where: { email } });
    if (userByEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const unverifiedUserByEmail = await this.unverifiedUserRepository.findOne({
      where: { email },
    });
    if (unverifiedUserByEmail) {
      throw new HttpException(
        'unverified user with that email exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.unverifiedUserRepository.create(data);
    user.verificationCode = await this.generateVerificationCode();
    await this.unverifiedUserRepository.save(user);

    // await this.emailService.sendVerificationCode(
    //   user.email,
    //   user.verificationCode,
    // );

    return this.verifyUser(user.verificationCode);
  }

  async verifyUser(code: string): Promise<UserRO> {
    const unverifiedUser = await this.unverifiedUserRepository.findOne({
      where: { verificationCode: code },
    });
    if (!unverifiedUser) {
      throw new HttpException('Invalid code', HttpStatus.BAD_REQUEST);
    }

    const user = this.userRepository.create(unverifiedUser);
    await this.userRepository.save(user);
    await this.unverifiedUserRepository.delete(unverifiedUser.id);

    return user.toResponseObject(true);
  }

  //deleting user account
  async deleteUser(userId: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['articles', 'articles.reviews', 'articles.content'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    //before deleting user we need to delete all his articles , each article has reviews and content so we need to delete them too

    await this.userRepository.delete(userId);
    return user.toResponseObject(true);
  }

  showAllUnverifiedUsers() {
    return this.unverifiedUserRepository.find();
  }
  //delete all unferified users
  async deleteUnverifiedUsers() {
    const unverifiedUsers = await this.unverifiedUserRepository.find();
    await this.unverifiedUserRepository.remove(unverifiedUsers);
    return unverifiedUsers.map((unverifiedUser) =>
      unverifiedUser.toResponseObject(true),
    );
  }

  async updateUser(
    userId: string,
    data: Partial<UserUpdateDTO>,
  ): Promise<UserRO> {
    if (Object.keys(data).length === 0) {
      throw new HttpException('No data submitted', HttpStatus.BAD_REQUEST);
    }

    let user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.update(userId, data);
    user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['articles', 'articles.reviews', 'articles.content'],
    });
    return user.toResponseObject(true);
  }

  async updateProfilePicture(
    userId: string,
    filename: string,
  ): Promise<UserRO> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (user.profilePicture) {
      // Delete the old profile picture
      const oldFilePath = `${process.env.Upload_TEMP_DIR}/${user.profilePicture}`;
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // Save the new profile picture path to the user record
    user.profilePicture = filename;
    await this.userRepository.save(user);
    return user.toResponseObject();
  }
}
