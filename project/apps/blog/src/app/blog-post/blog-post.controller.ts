import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { fillObject } from '@project/util/util-core';
import { PostRdo } from './rdo/post.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostQuery } from './query/post.query';
import { SearchQuery } from './query/search.query';

@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) {}

  @Get('/search')
  async search(@Query() query: SearchQuery) {
    Logger.log(query)
    const posts = await this.blogPostService.getPostsBySearch(query);
    return fillObject(PostRdo, posts);
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    const post = await this.blogPostService.getPost(id);
    return fillObject(PostRdo, post);
  }
  @Get('/')
  async index(@Query() query: PostQuery) {
    const posts = await this.blogPostService.getPosts(query);
    return fillObject(PostRdo, posts);
  }


  @Post('/')
  async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto);
    return fillObject(PostRdo, newPost);
  }
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.blogPostService.deletePost(id);
  }
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, dto);
    return fillObject(PostRdo, updatedPost);
  }

  @Patch('/publish/:id')
  async publish(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, { ...dto, isPublished: true });
    return fillObject(PostRdo, updatedPost);
  }

  @Patch('/unpublish/:id')
  async unpublish(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, { ...dto, isPublished: false });
    return fillObject(PostRdo, updatedPost);
  }
}
