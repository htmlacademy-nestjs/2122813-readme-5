import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';
import { LikesModule } from './blog-like/blog-like.module';
import { ConfigBlogModule } from '@project/config/config-blog';
import { BlogNotifyModule } from './blog-notify/blog-notify.module';

@Module({
  imports: [
    PrismaModule,
    BlogPostModule,
    BlogCommentModule,
    LikesModule,
    ConfigBlogModule,
    BlogNotifyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
