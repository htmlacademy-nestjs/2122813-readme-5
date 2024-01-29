import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentService } from './blog-comment.service';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@project/util/util-core';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from "../app.constant";
@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
  ],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository, JwtAccessStrategy, CheckAuthGuard],
  exports: [BlogCommentRepository]
})
export class BlogCommentModule {}
