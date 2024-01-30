import dayjs from 'dayjs';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { Injectable } from '@nestjs/common';
import { Subscriber } from '@project/shared/app-types';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.emailSubscriberRepository
      .create(new EmailSubscriberEntity(subscriber));
  }

  public async getSubscriber(email:string) {
    return await this.emailSubscriberRepository.findByEmail(email);
  }

  public async updateDateSent(subscriber: Subscriber) {
    const subscriberData = { ...subscriber, dateNotify: dayjs().toISOString() }
    const updatedSubscriber = new EmailSubscriberEntity(subscriberData)
    return await this.emailSubscriberRepository.update(subscriber.id, updatedSubscriber);
  }
}
