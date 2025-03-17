import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AppMailerService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'linoo.koko.dev@gmail.com',
          pass: 'jjmhyzdxpylczgef',
        },
      },
      defaults: {
        from: 'linoo.koko.dev@gmail.com',
      },
    }),
  ],
  providers: [AppMailerService],
  exports: [AppMailerService],
})
export class AppMailerModule {}
