import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppMailerService {
  constructor(private readonly mailerservice: MailerService) {}

  async sendVerificationMail(email: string) {
    return this.mailerservice.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `
        <p>Verify your email by clicking the link below</p><br/>
        <a href="www.google.com" target="_blink">Click here</a>
      `,
    });
  }
}
