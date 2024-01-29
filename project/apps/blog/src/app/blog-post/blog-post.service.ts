import { Injectable, Logger } from '@nestjs/common';
import { BlogPostRepository } from './blog-post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { PostType } from '@project/shared/app-types';
import { BlogPostLinkEntity, BlogPostPhotoEntity, BlogPostQuoteEntity, BlogPostTextEntity, BlogPostVideoEntity  } from './blog-post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostQuery } from './query/post.query';

import { Post as BlogPostType } from '@prisma/client';
import { SearchQuery } from './query/search.query';

const entity = {
  [PostType.Video]: BlogPostVideoEntity,
  [PostType.Text]: BlogPostTextEntity,
  [PostType.Link]: BlogPostLinkEntity,
  [PostType.Photo]: BlogPostPhotoEntity,
  [PostType.Quote]: BlogPostQuoteEntity
}
@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
  ) {}

  async createPost(dto: CreatePostDto): Promise<BlogPostType> {
    Logger.log(dto);
    const postEntity = new entity[dto.type]({ ...dto, comments: [] });
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
