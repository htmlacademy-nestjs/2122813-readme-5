import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';
import { CommentTextLength } from '../blog-comment.constant';
export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Comment'
  })
  @IsString()
  @MinLength(CommentTextLength.Min)
  @MaxLength(CommentTextLength.Max)
  public message: string;

  @ApiProperty({
    description: 'Post ID',
    example: 1
  })
  @IsInt()
  public postId: number;

  @ApiProperty({
    description: 'User ID',
    example: '1'
  })
  @IsString()
  public userId: string;
}
