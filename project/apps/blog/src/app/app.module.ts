import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BlogPostModule } from './blog-post/blog-post.module';

@Module({
  imports: [PrismaModule, BlogPostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
