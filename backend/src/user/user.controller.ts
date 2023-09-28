import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '../shared/validation.pipe';
import { UserService } from './user.service';
import { LoginUserDTO, UserChangePasswordDTO, UserDTO, UserUpdateDTO } from './user.dto';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from './user.decorator';
import { multerOptions } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { SocialsService } from './socials/socials.service';
import { SocialsDTO } from './socials/socials.interface';

@Controller()
export class UserController {
  constructor(private userService: UserService,private socialsService:SocialsService) {}
  @Get('users')
  showAllUsers() {
    return this.userService.showAll();
  }

  @Get('user/:id')
  showUserById(@Param('id') userId: string) {
    return this.userService.showUser(userId);
  }

  @Get('myProfile')
  @UseGuards(new AuthGuard())
  showUser(@User('id') userId: string) {
    return this.userService.showUser(userId);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: LoginUserDTO) {
    return this.userService.login(data);
  }
  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }

  @Put('myProfile')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateUser(@User('id') userId: string, @Body() data: Partial<UserUpdateDTO>) {
    return this.userService.updateUser(userId, data);
  }

  @Delete('myProfile')
  @UseGuards(new AuthGuard())
  deleteUser(@User('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Post('verify')
  @UsePipes(new ValidationPipe())
  verify(@Body() data: { verificationCode: string }) {
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

  @Put('profilePicture')
  @UseGuards(new AuthGuard())
  @UseInterceptors(FileInterceptor('profilePicture', multerOptions))
  async uploadProfilePicture(@UploadedFile() file, @User('id') userId: string) {
    return this.userService.updateProfilePicture(userId, file.filename);
  }

  @Put('change-password')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  async changePassword(
    @User('id') userId: string,
    @Body() data: UserChangePasswordDTO,
  ) {
    return this.userService.changePassword(userId, data);
  }

  @Put('socials')
  @UseGuards(new AuthGuard()) 
  @UsePipes(new ValidationPipe())
  async updateSocials(@User('id') userId: string, @Body() data: Partial<SocialsDTO>) {
    return this.socialsService.updateSocials(userId, data);
  }

  @Get('socials')
  @UseGuards(new AuthGuard())
  async getSocials(@User('id') userId: string) {
    return this.socialsService.getSocials(userId);
  }
}
