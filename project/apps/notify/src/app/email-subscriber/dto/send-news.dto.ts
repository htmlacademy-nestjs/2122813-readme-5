import { IsArray, IsEmail, IsString } from 'class-validator';
import { SubscriberMessage } from '../email-subscriber.constant';
import { Post } from '@prisma/client';

export class SendNewsDto {
  @IsEmail({}, { message: SubscriberMessage.NotValidEmail })
  public email: string;

  @IsArray()
  public posts: Post[];

  @IsString()
  public id: string;
}
