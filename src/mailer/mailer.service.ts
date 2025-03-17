import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppMailerService {
  constructor(private readonly mailerservice: MailerService) {}

  async sendMail() {
    return this.mailerservice.sendMail({
      from: 'linoo.koko.dev@gmail.com',
      to: 'values999@gmail.com',
      subject: 'Verify your email',
      text: 'Verify your email by clicking the link below',
      html: `
        <p>Verify your email by clicking the link below</p><br/>
        <a href="www.google.com" target="_blink">Click here</a>
      `,
    });
  }
}
