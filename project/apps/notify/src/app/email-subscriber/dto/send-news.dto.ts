import { IsArray, IsEmail, IsString } from 'class-validator';
import { EMAIL_NOT_VALID} from '../email-subscriber.constant';
import { Post } from '@prisma/client';

export class SendNewsDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsArray()
  public posts: Post[];

  @IsString()
  public id: string;
}
