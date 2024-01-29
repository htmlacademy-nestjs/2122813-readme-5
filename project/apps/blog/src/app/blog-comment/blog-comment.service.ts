import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '@project/shared/app-types';
import { BlogCommentRepository } from './blog-comment.repository';
import { Injectable } from '@nestjs/common';
import { BlogCommentEntity } from './blog-comment.entity';
import { CommentQuery } from './query/comment.query';
@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository
  ) {}

  async createComment(dto: CreateCommentDto, userId: string): Promise<Comment> {
    const commentEntity = new BlogCommentEntity({ ...dto, userId });
    return this.blogCommentRepository.create(commentEntity);
  }

  async deleteComment(id: number, userId: string): Promise<void> {
    const deletingComment = await this.getComment(id);

    if (deletingComment.userId === userId) {
      this.blogCommentRepository.destroy(id);
    }
  }

  async getComment(id: number): Promise<Comment> {
    return this.blogCommentRepository.findById(id);
  }
  async getComments(query: CommentQuery): Promise<Comment[]> {
    return this.blogCommentRepository.find(query);
  }

  async updateComment(id: number, dto: UpdateCommentDto, userId: string): Promise<Comment> {
    const editingComment = await this.getComment(id);

    if (editingComment?.userId === userId) {
      return this.blogCommentRepository.update(id, new BlogCommentEntity(dto));
    }
  }
}
