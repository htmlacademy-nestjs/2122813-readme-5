import { Module } from '@nestjs/common';
import { LikesController } from './blog-like.controller';
import { LikesService } from './blog-like.service';
import { LikeRepository } from './blog-like.repository';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
@Module({
  imports: [],
  controllers: [LikesController],
  providers: [LikesService, LikeRepository],
  exports: [LikeRepository],
})
export class LikesModule {}
