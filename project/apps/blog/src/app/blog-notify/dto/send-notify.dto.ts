import { Post } from '@prisma/client';

export class SendNotifyDto {
  public id: string;
  public email: string;
  public posts: Post[];
}
