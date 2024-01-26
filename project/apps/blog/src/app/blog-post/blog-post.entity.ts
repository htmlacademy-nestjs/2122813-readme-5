import { Entity } from '@project/util/util-types';
import { Type, Post, Comment} from '@project/shared/app-types';

export class BlogPostEntity implements Entity<BlogPostEntity>, Post {
  public id?: number;
  public title?: string;
  public description?: string;
  public link?: string;
  public announce?: string;
  public author?: string;
  public photo?: string;
  public userId: string;
  public comments?: Comment[];
  public type: Type;
  public publishAt: Date;
  public createdAt: Date;

  constructor(post: Post) {
    this.fillEntity(post);
  }

  public fillEntity(entity: Post): void {
    this.id = entity.id;
    this.title = entity.title;
    this.description = entity.description;
    this.link = entity.link;
    this.announce = entity.announce;
    this.author = entity.author;
    this.photo = entity.photo;
    this.type = entity.type;
    this.userId = entity.userId;
    this.comments = entity.comments ?? [];
    this.publishAt = new Date();
    this.createdAt = new Date();
  }

  public toObject(): BlogPostEntity {
    return {
      ...this,
      comments: [...this.comments],
    };
  }

}
