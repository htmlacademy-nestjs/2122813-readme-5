import { BlogCommentService } from './blog-comment.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { CommentRdo } from './rdo/comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PostQuery } from './query/comment.query';

@Controller('comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const existCategory = await this.blogCommentService.getComment(id);
    return fillObject(CommentRdo, existCategory);
  }

  @Get('/')
  async index(@Query() query: PostQuery) {
    const existCategory = await this.blogCommentService.getComments(query);
    return fillObject(CommentRdo, existCategory);
  }

  // @Get('/')
  // async index() {
  //   const categories = await this.blogCommentService.getComments();
  //   return fillObject(CategoryRdo, categories);
  // }

  @Post('/')
  async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.blogCommentService.createComment(dto);
    return fillObject(CommentRdo, newComment);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.blogCommentService.deleteComment(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateCommentDto) {
    const updatedComment = await this.blogCommentService.updateComment(id, dto);
    Logger.log(updatedComment);
    return fillObject(CommentRdo, updatedComment);
  }
}
