import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';
import { LikesModule } from './blog-like/blog-like.module';

@Module({
  imports: [PrismaModule, BlogPostModule, BlogCommentModule, LikesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
