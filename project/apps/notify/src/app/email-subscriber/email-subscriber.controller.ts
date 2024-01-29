import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { SendNewsDto } from './dto/send-news.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/app-types';
import { MailService } from '../mail/mail.service';
import { getNewPosts } from './utils/get-posts';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'project.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'project.notify',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'project.notify',
    routingKey: RabbitRouting.SendNotify,
    queue: 'project.notify.news',
  })
  public async sendNewsletter(dto: SendNewsDto) {
    const { email, posts } = dto;
    const subscriber = await this.subscriberService.getSubscriber(email);
    if (subscriber && posts.length > 0) {
      const newPosts = getNewPosts(dto, subscriber);
      if (newPosts.length > 0) {
        await this.mailService.sendNotify(subscriber.email, newPosts);
        this.subscriberService.updateDateSent(subscriber);
      }
    }
  }
}
