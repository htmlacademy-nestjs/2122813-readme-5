import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Req, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { fillObject } from '@project/util/util-core';
import { CommentRdo } from './rdo/comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentQuery } from './query/comment.query';
import { CommentsMessages } from './blog-comment.constant';
import { CreateCommentValidationPipe } from './pipes/create-comment-validation.pipe';
import { UpdateCommentValidationPipe } from './pipes/update-comment-validation.pipe';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { RequestWithTokenPayload } from '@project/shared/app-types';

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
  @UseGuards(CheckAuthGuard)
  @Post('/')
  async create(@Req() { user }: RequestWithTokenPayload, @Body(CreateCommentValidationPipe) dto: CreateCommentDto) {
    const newComment = await this.blogCommentService.createComment(dto, user.sub);
    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: CommentsMessages.Remove
  })
  @UseGuards(CheckAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Req() { user }: RequestWithTokenPayload, @Param('id') id: number) {
    this.blogCommentService.deleteComment(id, user.sub);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: CommentsMessages.Update
  })
  @UseGuards(CheckAuthGuard)
  @Patch('/:id')
  async update(@Req() { user }: RequestWithTokenPayload, @Param('id') id: number, @Body(UpdateCommentValidationPipe) dto: UpdateCommentDto) {
    const updatedComment = await this.blogCommentService.updateComment(id, dto, user.sub);
    return fillObject(CommentRdo, updatedComment);
  }
}
