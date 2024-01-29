import { Body, Controller, HttpStatus, Param, Post, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikesService } from './blog-like.service';
import { fillObject } from '@project/util/util-core';
import { LikeRdo } from './rdo/blog-like.rdo';
import { LikesMessages } from './blog-like.constant';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesMessages.Add
  })
  @Post('/:postId')
  public async changeLikeStatus(@Param('postId') id: number, @Body('userId') userId: string) {
    const newLike = await this.likesService.changePostLike(id, userId);
    return fillObject(LikeRdo, newLike);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesMessages.Show
  })
  @Get('/:postId')
  public async getLikes(@Param('postId') id: number) {
    const likeInfo = await this.likesService.findByPostId(id);
    return fillObject(LikeRdo, likeInfo);
  }
}
