import { Comment } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class BlogCommentEntity implements Entity<BlogCommentEntity>, Comment {
  public id?: number;
  public message: string;
  public postId: number;
  public userId: string;
  public updatedAt: Date;
  public createdAt: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public fillEntity(entity: Comment): void {
    this.id = entity.id;
    this.postId = entity.postId;
    this.userId = entity.userId;
    this.message = entity.message;
    this.updatedAt = new Date();
    this.createdAt = new Date();
  }

  public toObject(): BlogCommentEntity {
    return {
      ...this
    };
  }

}
