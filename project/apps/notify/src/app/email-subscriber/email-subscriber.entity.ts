import { Entity } from '@project/util/util-types';
import { Subscriber } from '@project/shared/app-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string;
  public email: string;
  public name: string;
  public userId: string;
  public dateNotify?: string;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.name = entity.name;
    this.id = entity.id;
    this.dateNotify = entity.dateNotify;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
