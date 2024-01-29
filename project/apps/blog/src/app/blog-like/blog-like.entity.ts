import { Like } from '@project/shared/app-types';

export class LikeEntity implements Like {
  public postId: number;
  public userId: string;

  constructor(like: Like) {
    this.fillEntity(like);
  }

  public toObject() {
    return {...this };
  }

  public fillEntity(like: Like) {
    this.postId = like.postId;
    this.userId = like.userId;
  }
}
