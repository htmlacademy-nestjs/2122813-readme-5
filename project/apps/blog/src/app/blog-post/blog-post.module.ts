import { Module } from "@nestjs/common";
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';

@Module({
  imports: [],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository],
})
export class BlogPostModule {}
