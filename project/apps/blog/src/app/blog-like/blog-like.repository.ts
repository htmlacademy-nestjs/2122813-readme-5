import { Injectable } from '@nestjs/common';
import { Like } from '@project/shared/app-types';
import { LikeEntity } from './blog-like.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: LikeEntity): Promise<Like> {
    return await this.prisma.like.create({data: {...item.toObject()}})
  }

  public async findById(postId: number, userId: string): Promise<Like> {
    return await this.prisma.like.findFirst({
      where: {
        postId,
        userId
      }
    });
  }

  public async findByPostId(postId: number): Promise<Like[]> {
    return await this.prisma.like.findMany({
      where: {
        postId
      }
    });
  }

  public async destroy(likeId: number): Promise<void> {
    await this.prisma.like.delete({ where: {likeId} });
  }
}
