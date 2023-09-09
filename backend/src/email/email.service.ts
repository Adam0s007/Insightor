import { Injectable, InternalServerErrorException } from '@nestjs/common';

import {MailerService} from '@nestjs-modules/mailer'

@Injectable()
export class EmailService {
  
  constructor(
    private readonly mailerService: MailerService) {
    
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    this.mailerService.sendMail({
      from: 'insightor83@gmail.com',
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is ${code}`,
      html: `<b>Your verification code is ${code}</b>`,
    });

    
  }
}
