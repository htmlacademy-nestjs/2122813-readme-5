import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { BlogCommentEntity } from './blog-comment.entity';
import { Comment } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class BlogCommentRepository implements CRUDRepository<BlogCommentEntity, number, Comment> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogCommentEntity): Promise<Comment> {
    return this.prisma.comment.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        commentId: id
      }
    });
  }

  public async findById(id: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: {
        commentId: id
      }
    });
  }

  public find({limit, postId, sortDirection, page}: CommentQuery): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        postId
      },
      take: limit,
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(id: number, item: BlogCommentEntity): Promise<Comment> {
    return this.prisma.comment.update({
      where: {
        commentId: id
      },
      data: { ...item.toObject(), commentId: id }
    });
  }
}
