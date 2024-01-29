import { Body, Controller, HttpStatus, Param, Post, Get } from '@nestjs/common';
import { LikesService } from './blog-like.service';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { LikeRdo } from './rdo/blog-like.rdo';

@Controller('likes')
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
  ) {}

  @ApiResponse({
    status:HttpStatus.CREATED,
  })
  @Post('/:postId')
  public async changeLikeStatus(@Param('postId') id: number, @Body('userId') userId: string) {
    const newLike = await this.likesService.changePostLike(id, userId);
    return fillObject(LikeRdo, newLike);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get('/:postId')
  public async getLikes(@Param('postId') id: number) {
    const likeInfo = await this.likesService.findByPostId(id);
    return fillObject(LikeRdo, likeInfo);

  }
}
