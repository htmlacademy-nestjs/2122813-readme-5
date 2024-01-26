import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';
import { BlogUserRepository } from './blog-user.repository';
import { NotifyModule } from '../notify/notify.module';
import { BlogUserService } from './blog-user.service';
import { BlogUserController } from './blog-user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogUserModel.name, schema: BlogUserSchema }
    ]),
    NotifyModule
  ],
  controllers: [BlogUserController],
  providers: [BlogUserRepository, BlogUserService],
  exports: [BlogUserRepository, BlogUserService]
})
export class BlogUserModule {}
