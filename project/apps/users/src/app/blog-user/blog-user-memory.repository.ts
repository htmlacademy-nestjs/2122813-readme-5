import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BlogUserEntity } from './blog-user.entity';
import { BaseMongoRepository } from '@project/util/util-core';
import { BlogUserModel } from './blog-user.model';

@Injectable()
export class BlogUserMemoryRepository extends BaseMongoRepository<BlogUserEntity, BlogUserModel> {
  constructor(
    @InjectModel(BlogUserModel.name) blogUserModel: Model<BlogUserModel>
  ) {
    super(blogUserModel, BlogUserEntity.fromObject);
  }
  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    return this.createEntityFromDocument(document);
  }
}
