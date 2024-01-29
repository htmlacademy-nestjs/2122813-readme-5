import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { BlogPost } from './blog-post.entity';
import { PrismaService } from '../prisma/prisma.service';
import { PostQuery } from './query/post.query';
import { Post as BlogPostType } from '@prisma/client';
import { SearchQuery } from './query/search.query';

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
        comments: true,
        likes: true
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

  public search({ title, limit }: SearchQuery): Promise<BlogPostType[]> {
    return this.prisma.post.findMany({
      where: {
        title: {
          contains: title
        },
      },
      take: limit,
      include: {
        comments: true,
        likes: true
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

  public find({limit, page, userId, type, sortDirection, sortBy, tag}: PostQuery): Promise<BlogPostType[]> {
    const orderBy = sortBy !== 'createdAt'
      ? { [sortBy]: { _count: sortDirection } }
      : { [sortBy]: sortDirection };

    const where = {
      userId,
      type,
      isPublished: true,
      tags: { has: tag }
    };

    if (!tag) {
      delete where.tags;
    }

    return this.prisma.post.findMany({
      where,
      take: limit,
      include: {
        comments: true,
        likes: true,
      },
      orderBy,
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
