import { Logger } from '@nestjs/common';

import { Entity } from '@project/util/util-types';
import { PostType, PostBase, Post, Comment, PostVideo, PostPhoto, PostLink, PostQuote, PostText } from '@project/shared/app-types';

export class BlogPostEntity implements Entity<BlogPostEntity>, PostBase {
  public id?: number;
  public userId: string;
  public comments?: Comment[];
  public tags?: string[];
  public type: PostType;
  public publishAt: Date;
  public createdAt: Date;

  constructor(post: Post) {
    this.fillEntity(post);
  }

  public fillEntity(entity: Post): void {
    this.id = entity.id;
    this.type = entity.type;
    this.userId = entity.userId;
    this.tags = entity.tags ?? [];
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
export class BlogPostVideoEntity extends BlogPostEntity implements Entity<BlogPostVideoEntity>, PostVideo {
  public title: string;
  public link: string;
  public type: PostType.Video;

  constructor(post: PostVideo) {
    super(post);
    this.fillEntity(post);
    Logger.log(this);

  }

  public fillEntity(entity: PostVideo): void {
    this.id = entity.id;
    this.title = entity.title;
    this.link = entity.link;
    this.type = entity.type;
    this.id = entity.id;
    this.type = entity.type;
    this.userId = entity.userId;
    this.tags = entity.tags ?? [];
    this.comments = entity.comments ?? [];
    this.publishAt = entity.publishAt ? new Date(entity.publishAt) : new Date();
    this.createdAt = entity.createdAt ? new Date(entity.createdAt) : new Date();
  }

  public toObject(): BlogPostVideoEntity {
    return {
      ...this,
      comments: [...this.comments],
    };
  }
}

export class BlogPostTextEntity extends BlogPostEntity implements Entity<BlogPostTextEntity>, PostText {
  public title: string;
  public announce: string;
  public description: string;
  public type: PostType.Text;

  constructor(post: PostText) {
    super(post);
    this.fillEntity(post);
  }

  public fillEntity(entity: PostText): void {
    this.title = entity.title;
    this.announce = entity.announce;
    this.description = entity.description;
    this.type = entity.type;
    this.id = entity.id;
    this.type = entity.type;
    this.userId = entity.userId;
    this.tags = entity.tags ?? [];
    this.comments = entity.comments ?? [];
    this.publishAt = entity.publishAt ? new Date(entity.publishAt) : new Date();
    this.createdAt = entity.createdAt ? new Date(entity.createdAt) : new Date();
  }

  public toObject(): BlogPostTextEntity {
    return {
      ...this,
      comments: [...this.comments],
    };
  }
}

export class BlogPostQuoteEntity extends BlogPostEntity implements Entity<BlogPostQuoteEntity>, PostQuote {
  public author: string;
  public description: string;
  public type: PostType.Quote;

  constructor(post: PostQuote) {
    super(post);
    this.fillEntity(post);
  }

  public fillEntity(entity: PostQuote): void {
    this.author = entity.author;
    this.description = entity.description;
    this.type = entity.type;
    this.id = entity.id;
    this.type = entity.type;
    this.userId = entity.userId;
    this.tags = entity.tags ?? [];
    this.comments = entity.comments ?? [];
    this.publishAt = entity.publishAt ? new Date(entity.publishAt) : new Date();
    this.createdAt = entity.createdAt ? new Date(entity.createdAt) : new Date();
  }

  public toObject(): BlogPostQuoteEntity {
    return {
      ...this,
      comments: [...this.comments],
    };
  }
}

export class BlogPostLinkEntity extends BlogPostEntity implements Entity<BlogPostLinkEntity>, PostLink {
  public link: string;
  public description?: string;
  public type: PostType.Link;

  constructor(post: PostLink) {
    super(post);
    this.fillEntity(post);
  }

  public fillEntity(entity: PostLink): void {
    this.link = entity.link;
    this.description = entity.description;
    this.type = entity.type;
    this.id = entity.id;
    this.type = entity.type;
    this.userId = entity.userId;
    this.tags = entity.tags ?? [];
    this.comments = entity.comments ?? [];
    this.publishAt = entity.publishAt ? new Date(entity.publishAt) : new Date();
    this.createdAt = entity.createdAt ? new Date(entity.createdAt) : new Date();
  }

  public toObject(): BlogPostLinkEntity {
    return {
      ...this,
      comments: [...this.comments],
    };
  }
}

export class BlogPostPhotoEntity extends BlogPostEntity implements Entity<BlogPostPhotoEntity>, PostPhoto {
  public photo: string;
  public type: PostType.Photo;

  constructor(post: PostPhoto) {
    super(post);
    this.fillEntity(post);
  }

  public fillEntity(entity: PostPhoto): void {
    this.photo = entity.photo;
    this.type = entity.type;
    this.id = entity.id;
    this.type = entity.type;
    this.userId = entity.userId;
    this.tags = entity.tags ?? [];
    this.comments = entity.comments ?? [];
    this.publishAt = entity.publishAt ? new Date(entity.publishAt) : new Date();
    this.createdAt = entity.createdAt ? new Date(entity.createdAt) : new Date();
  }

  public toObject(): BlogPostPhotoEntity {
    return {
      ...this,
      comments: [...this.comments],
    };
  }
}

export type BlogPost = BlogPostLinkEntity | BlogPostPhotoEntity | BlogPostQuoteEntity | BlogPostTextEntity | BlogPostVideoEntity;
