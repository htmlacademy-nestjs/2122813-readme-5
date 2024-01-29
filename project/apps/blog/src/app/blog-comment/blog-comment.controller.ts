import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { fillObject } from '@project/util/util-core';
import { CommentRdo } from './rdo/comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentQuery } from './query/comment.query';
import { CommentsMessages } from './blog-comment.constant';
import { CreateCommentValidationPipe } from './pipes/create-comment-validation.pipe';
import { UpdateCommentValidationPipe } from './pipes/update-comment-validation.pipe';

@ApiTags('comments')
@Controller('comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService
  ) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: CommentsMessages.Show
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const comment = await this.blogCommentService.getComment(id);
    return fillObject(CommentRdo, comment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: CommentsMessages.ShowAll
  })
  @Get('/')
  async index(@Query() query: CommentQuery) {
    const comment = await this.blogCommentService.getComments(query);
    return fillObject(CommentRdo, comment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: CommentsMessages.Add
  })
  @Post('/')
  async create(@Body(CreateCommentValidationPipe) dto: CreateCommentDto) {
    const newComment = await this.blogCommentService.createComment(dto);
    return fillObject(CommentRdo, newComment);
  }
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: CommentsMessages.Remove
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.blogCommentService.deleteComment(id);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: CommentsMessages.Update
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body(UpdateCommentValidationPipe) dto: UpdateCommentDto) {
    const updatedComment = await this.blogCommentService.updateComment(id, dto);
    return fillObject(CommentRdo, updatedComment);
  }
}
