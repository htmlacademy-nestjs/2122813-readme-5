import { IsEmail, IsNotEmpty } from 'class-validator';
import { SubscriberMessage } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: SubscriberMessage.NotValidEmail })
  public email: string;

  @IsNotEmpty({ message: SubscriberMessage.NameIsEmpty })
  public name: string;

  @IsNotEmpty({ message: SubscriberMessage.IdIsEmpty })
  public userId: string;
}
