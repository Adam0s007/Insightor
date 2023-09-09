import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async generateVerificationCode(): Promise<string> {
    // For simplicity, let's generate a random 6-digit code. You can replace this with a more secure implementation.
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  async showAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find({
      // relations: ['ideas', 'bookmarks'],
    });
    return users.map((user) => user.toResponseObject(true));
  }

  async showUser(userId: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user.toResponseObject(true);
  }

  async login(data: UserDTO): Promise<UserRO> {
    const { personName, password } = data;
    const user = await this.userRepository.findOne({ where: { personName } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject(true);
  }
  async register(data: UserDTO): Promise<UserRO> {
    const { personName, email } = data;

    // Check if user with the same name exists
    const userByName = await this.userRepository.findOne({ where: { personName } });
    if (userByName) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // Check if user with the same email exists
    const userByEmail = await this.userRepository.findOne({ where: { email } });
    if (userByEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    // If both checks pass, create the user
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);

    // Generate verification code
    const verificationCode = await this.generateVerificationCode();


    return user.toResponseObject(true);
  }

  //deleting user account
  async deleteUser(userId: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete(userId);
    return user.toResponseObject(true);
  }
}
