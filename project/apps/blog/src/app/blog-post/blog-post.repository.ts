import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { BlogPost } from './blog-post.entity';
import { PrismaService } from '../prisma/prisma.service';
import { PostQuery } from './query/post.query';
import { Post as BlogPostType } from '@prisma/client';

@Injectable()
export class BlogPostRepository implements CRUDRepository<BlogPost, number, BlogPostType> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPost): Promise<BlogPostType> {
    const entityData = item.toObject();
    return this.prisma.post.create({
      data: {
        ...entityData,
        comments: {
          connect: []
        },
      },
      include: {
        comments: true
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

  public async findById(postId: number): Promise<BlogPostType | null> {
    return this.prisma.post.findFirst({
      where: {
        postId
      },
      include: {
        comments: true,
        likes: true
      }
    });
  }

  public find({limit, userId, type, sortDirection, page}: PostQuery): Promise<BlogPostType[]> {
    return this.prisma.post.findMany({
      where: {
        userId,
        type,
        publishAt: { not: null }
      },
      take: limit,
      include: {
        comments: true,
        likes: true
      },
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(id: number, item): Promise<BlogPostType> {
    return this.prisma.post.update({
      where: {
        postId: id
      },
      data: { ...item, postId: id },
      include: {
        comments: true,
        likes: true
      }
    });
  }
}
