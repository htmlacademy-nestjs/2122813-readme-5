import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { CommentTextLength } from '../blog-comment.constant';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Comment'
  })
  @IsString()
  @MinLength(CommentTextLength.Min)
  @MaxLength(CommentTextLength.Max)
  public message: string;
}
