import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '@project/shared/app-types';
import { BlogCommentRepository } from './blog-comment.repository';
import { Injectable, Logger } from '@nestjs/common';
import { BlogCommentEntity } from './blog-comment.entity';
import { PostQuery } from './query/comment.query';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository
  ) {}

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const commentEntity = new BlogCommentEntity(dto);
    return this.blogCommentRepository.create(commentEntity);
  }

  async deleteComment(id: number): Promise<void> {
    this.blogCommentRepository.destroy(id);
  }

  async getComment(id: number): Promise<Comment> {
    return this.blogCommentRepository.findById(id);
  }

  async getComments(query: PostQuery): Promise<Comment[]> {
    return this.blogCommentRepository.find(query);
  }

  async updateComment(id: number, dto: UpdateCommentDto): Promise<Comment> {
    Logger.log(new BlogCommentEntity(dto))
    return this.blogCommentRepository.update(id, new BlogCommentEntity(dto));
  }
}
