import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@project/util/util-core';
import { LikesController } from './blog-like.controller';
import { LikesService } from './blog-like.service';
import { LikeRepository } from './blog-like.repository';
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
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [LikesController],
  providers: [LikesService, LikeRepository, JwtAccessStrategy, CheckAuthGuard],
  exports: [LikeRepository],
})
export class LikesModule {}
