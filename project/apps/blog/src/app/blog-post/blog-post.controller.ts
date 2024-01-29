import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogPostService } from './blog-post.service';
import { fillObject } from '@project/util/util-core';
import { PostRdo } from './rdo/post.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostQuery } from './query/post.query';
import { SearchQuery } from './query/search.query';
import { PostMessages } from './blog-post.constant';

@ApiTags('posts')
@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) {}


  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Search
  })
  @Get('/search')
  async search(@Query() query: SearchQuery) {
    const posts = await this.blogPostService.getPostsBySearch(query);
    return fillObject(PostRdo, posts);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostMessages.Show
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const post = await this.blogPostService.getPost(id);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.ShowAll
  })
  @Get('/')
  async index(@Query() query: PostQuery) {
    const posts = await this.blogPostService.getPosts(query);
    return fillObject(PostRdo, posts);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Add
  })
  @Post('/')
  async create(@Body() dto: CreatePostDto) {
    const post = { ...dto }
    if (dto.postId && !dto.isRepost) {
      post.originPostId = dto.postId
      post.originUserId = dto.userId
      post.isRepost = true
    }
    const newPost = await this.blogPostService.createPost(dto);
    return fillObject(PostRdo, newPost);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostMessages.Remove
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.blogPostService.deletePost(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Update
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, dto);
    return fillObject(PostRdo, updatedPost);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Update
  })
  @Patch('/publish/:id')
  async publish(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, { ...dto, isPublished: true, publishAt: new Date() });
    return fillObject(PostRdo, updatedPost);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Update
  })
  @Patch('/unpublish/:id')
  async unpublish(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, { ...dto, isPublished: false, publishAt: null });
    return fillObject(PostRdo, updatedPost);
  }
}
