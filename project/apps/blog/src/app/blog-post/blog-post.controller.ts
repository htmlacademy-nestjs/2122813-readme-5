import { Body, Req, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogPostService } from './blog-post.service';
import { fillObject } from '@project/util/util-core';
import { PostRdo } from './rdo/post.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostQuery } from './query/post.query';
import { SearchQuery } from './query/search.query';
import { PostMessages } from './blog-post.constant';
import { CreatePostValidationPipe } from './pipes/create-post-validation.pipe';
import { UpdatePostValidationPipe } from './pipes/update-post-validation.pipe';
import { RequestWithTokenPayload } from '@project/shared/app-types';
import { BlogNotifyService } from '../blog-notify/blog-notify.service';
import { CheckAuthGuard } from '../guards/check-auth.guard';
@ApiTags('posts')
@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService,
    private readonly blogNotifyService: BlogNotifyService,
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
    status: HttpStatus.OK,
    description: PostMessages.SendNews
  })
  @UseGuards(CheckAuthGuard)
  @Get('/news')
  public async sendNews(@Req() { user }: RequestWithTokenPayload, @Query() query: PostQuery) {
    const { email, sub } = user;
    const posts = await this.blogPostService.getPosts(query)
    this.blogNotifyService.sendNews({ email, posts, id:sub });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.ShowUnpublished
  })
  @UseGuards(CheckAuthGuard)
  @Get('/unpublished')
  public async showUnpublishedPosts(@Req() { user }: RequestWithTokenPayload) {
    const posts = await this.blogPostService.getUnpublishedPosts(user.sub)
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
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostMessages.ShowAll
  })
  @Get('/')
  async index(@Query() query: PostQuery) {
    const posts = await this.blogPostService.getPosts(query);
    return fillObject(PostRdo, posts);
  }
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostMessages.Add
  })
  @UseGuards(CheckAuthGuard)
  @Post('/')
  async create(@Req() { user }: RequestWithTokenPayload, @Body(CreatePostValidationPipe) dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto, user.sub);
    return fillObject(PostRdo, newPost);
  }
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostMessages.Remove
  })
  @UseGuards(CheckAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Req() { user }: RequestWithTokenPayload, @Param('id') id: number) {
    this.blogPostService.deletePost(id, user.sub);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostMessages.Update
  })
  @UseGuards(CheckAuthGuard)
  @Patch('/:id')
  async update(@Req() { user }: RequestWithTokenPayload, @Param('id') id: number, @Body(UpdatePostValidationPipe) dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, dto, user.sub);
    return fillObject(PostRdo, updatedPost);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostMessages.Update
  })
  @UseGuards(CheckAuthGuard)
  @Patch('/publish/:id')
  async publish(@Req() { user }: RequestWithTokenPayload, @Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, { ...dto, isPublished: true, publishAt: new Date() }, user.sub);
    return fillObject(PostRdo, updatedPost);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostMessages.Update
  })
  @UseGuards(CheckAuthGuard)
  @Patch('/unpublish/:id')
  async unpublish(@Req() { user }: RequestWithTokenPayload, @Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, { ...dto, isPublished: false, publishAt: null }, user.sub);
    return fillObject(PostRdo, updatedPost);
  }
}
