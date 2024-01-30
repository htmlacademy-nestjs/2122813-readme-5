import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@project/util/util-core';
import { LikesController } from './blog-like.controller';
import { LikesService } from './blog-like.service';
import { LikeRepository } from './blog-like.repository';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { HttpClientParam } from "../app.constant";

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
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
