

//---------------------------------------------


import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: '',
          pass: '',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      }
      
    }),
  ],
  providers: [EmailService],
  exports: [EmailService], // 👈 export for DI
})
export class EmailModule {}