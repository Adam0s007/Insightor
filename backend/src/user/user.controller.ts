import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '../shared/validation.pipe';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from './user.decorator';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @Get('users')
  showAllUsers() {
    return this.userService.showAll();
  }

  @Get('myProfile')
  @UseGuards(new AuthGuard())
  showUser(@User('id') userId: string) {
    return this.userService.showUser(userId);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }
  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }

  @Delete('myProfile')
  @UseGuards(new AuthGuard())
  deleteUser(@User('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Post('verify')
  @UsePipes(new ValidationPipe())
  verify(@Body() data: {verificationCode: string }) {
    return this.userService.verifyUser(data.verificationCode);
  }

  @Get('unverifiedUsers')
    showAllUnverifiedUsers() {
        return this.userService.showAllUnverifiedUsers();
    }

  @Delete('unverifiedUsers')
    deleteUnverifiedUsers() {
        return this.userService.deleteUnverifiedUsers();
    }

}
