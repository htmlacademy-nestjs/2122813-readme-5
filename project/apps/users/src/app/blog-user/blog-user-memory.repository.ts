import { BlogUserEntity } from './blog-user.entity';
import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/util/util-core';

@Injectable()
export class BlogUserMemoryRepository extends BaseMemoryRepository<BlogUserEntity> {
  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const entities = Array.from(this.entities.values());
    const user = entities.find((entity) => entity.email === email);
    return Promise.resolve(user);
  }
}
