import { Comment, Type } from '@project/shared/app-types';
import { Expose } from 'class-transformer';

export class PostRdo {
  @Expose()
  public id: string;

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
  public publishAt?: string;

  @Expose()
  public userId: string;

  @Expose()
  public type: Type;

  @Expose()
  public comments?: Comment[]
}
