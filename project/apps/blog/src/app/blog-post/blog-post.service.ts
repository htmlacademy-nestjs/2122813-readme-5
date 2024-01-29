import { Injectable } from '@nestjs/common';
import { BlogPostRepository } from './blog-post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogEntity } from './blog-post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostQuery } from './query/post.query';

import { Post as BlogPostType } from '@prisma/client';
import { SearchQuery } from './query/search.query';
import { prepareTags } from '@project/util/util-core';


@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
  ) {}

  async createPost(dto: CreatePostDto): Promise<BlogPostType> {
    const post = { ...dto }
    if (dto.postId && !dto.isRepost) {
      post.originPostId = dto.postId
      post.originUserId = dto.userId
      post.isRepost = true
    }
    const postEntity = new BlogEntity[dto.type]({ ...post, comments: [], tags: prepareTags(dto.tags) });
    return this.blogPostRepository.create(postEntity);
  }

  async deletePost(id: number): Promise<void> {
    this.blogPostRepository.destroy(id);
  }
  async getPost(id: number): Promise<BlogPostType> {
    return this.blogPostRepository.findById(id);
  }
  async getPosts(query: PostQuery): Promise<BlogPostType[]> {
    return this.blogPostRepository.find(query);
  }
  async getPostsBySearch(search: SearchQuery): Promise<BlogPostType[]> {
    return this.blogPostRepository.search(search);
  }
  async updatePost(id: number, dto: UpdatePostDto): Promise<BlogPostType> {
    return this.blogPostRepository.update(id, dto);
  }
}
