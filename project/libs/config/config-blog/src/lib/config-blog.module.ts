import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_BLOG_FILE_PATH } from './config-blog.constant';
import rabbitConfig from './config/rabbit.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [jwtConfig, rabbitConfig],
      envFilePath: ENV_BLOG_FILE_PATH
    }),
  ]
})
export class ConfigBlogModule {}
