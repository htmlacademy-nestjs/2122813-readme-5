import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';

@Module({
  imports: [PrismaModule, BlogPostModule, BlogCommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
