import { Injectable } from '@nestjs/common';
import { LikeRepository } from './blog-like.repository';
import { LikeEntity } from './blog-like.entity';

@Injectable()
export class LikesService {
  constructor(
    private readonly likeRepository: LikeRepository
    ) { }

  public async create(postId: number, userId: string) {
    return this.likeRepository.create(new LikeEntity({ postId, userId }));
  }

  public async findByUserAndPostId(postId: number, userId: string) {
    return await this.likeRepository.findById(postId, userId);
  }

  public async findByPostId(postId: number) {
    return await this.likeRepository.findByPostId(postId);
  }

  public async changePostLike(postId: number, userId: string) {
    const like = await this.findByUserAndPostId(postId, userId)
    if(!like){
      return await this.create(postId, userId)
    }
    return this.likeRepository.destroy(like.likeId);
  }
}
