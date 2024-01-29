import { Req, Controller, HttpStatus, Param, Post, Get, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikesService } from './blog-like.service';
import { fillObject } from '@project/util/util-core';
import { LikeRdo } from './rdo/blog-like.rdo';
import { LikesMessage } from './blog-like.constant';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { RequestWithTokenPayload } from '@project/shared/app-types';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
  ) {}
  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesMessage.Add
  })
  @UseGuards(CheckAuthGuard)
  @Post('/:postId')
  public async changeLikeStatus(@Param('postId') id: number, @Req() { user }: RequestWithTokenPayload ) {
    const newLike = await this.likesService.changePostLike(id, user.sub);
    return fillObject(LikeRdo, newLike);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesMessage.Show
  })
  @Get('/:postId')
  public async getLikes(@Param('postId') id: number) {
    const likeInfo = await this.likesService.findByPostId(id);
    return fillObject(LikeRdo, likeInfo);
  }
}
