import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { BlogPostEntity } from './blog-post.entity';
import { Post } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogPostRepository implements CRUDRepository<BlogPostEntity, number, Post> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPostEntity): Promise<Post> {
    const entityData = item.toObject();
    return this.prisma.post.create({
      data: {
        ...entityData,
        comments: {
          connect: []
        },
        type: {
          connect: entityData.type
        }
      },
      include: {
        comments: true,
        type: true,
      }
    });
  }

  public async destroy(postId: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        postId,
      }
    });
  }

  public async findById(postId: number): Promise<Post | null> {
    return this.prisma.post.findFirst({
      where: {
        postId
      },
      include: {
        comments: true,
        type: true,
      }
    });
  }

  public find(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        comments: true,
        type: true
      }
    });
  }

  public update(_id: number, _item: BlogPostEntity): Promise<Post> {
    return Promise.resolve(undefined);
  }
}
