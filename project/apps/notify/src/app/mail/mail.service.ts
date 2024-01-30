import { Subscriber } from '@project/shared/app-types';
import { Inject, Injectable } from '@nestjs/common';
import { EmailSubject } from './mail.constant';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import { notifyConfig } from '@project/config/config-notify';
import { Post } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,

    @Inject(notifyConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof notifyConfig>,
  ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: subscriber.email,
      subject: EmailSubject.EmailAddSubscriberSubject,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNotify(email: string, posts: Post[]) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: email,
      subject: EmailSubject.EmailNotifySubject,
      template: './news',
      context: {
        posts
      }
    })
  }
}
