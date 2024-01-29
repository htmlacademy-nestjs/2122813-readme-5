import { Comment, PostType, Like } from '@project/shared/app-types';
import { Expose, Transform } from 'class-transformer';

export class PostRdo {
  @Expose()
  public postId: number;

  @Expose()
  public title?: string;
  @Expose()
  public description?: string;
  @Expose()
  public link?: string;
  @Expose()
  public announce?: string;
  @Expose()
  public author?: string;
  @Expose()
  public photo?: string;

  @Expose()
  public publishAt?: Date;

  @Expose()
  public createdAt: Date;

  @Expose()
  public userId: string;

  @Expose()
  public isPublished: boolean;

  @Expose()
  public isRepost: boolean;

  @Expose()
  public type: PostType;

  @Expose()
  @Transform(({ value }) => value.length)
  public comments?: Comment[]

  @Expose()
  public tags?: string[]

  @Expose()
  @Transform(({ value }) => value.length)
  public likes?: Like[]
}
