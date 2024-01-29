import { Module } from "@nestjs/common";
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@project/util/util-core';
import { BlogNotifyModule } from "../blog-notify/blog-notify.module";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    BlogNotifyModule
  ],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, JwtAccessStrategy],
})
export class BlogPostModule {}
