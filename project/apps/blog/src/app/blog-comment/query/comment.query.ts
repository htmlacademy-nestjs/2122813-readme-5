import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../blog-comment.constant';

export class CommentQuery {
  @ApiProperty({
    description: 'limit',
    example: 25
  })
  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_POST_COUNT_LIMIT;

  @ApiProperty({
    description: 'Post ID',
    example: 1
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public postId?: number;

  @ApiProperty({
    description: 'Sort direction',
    example: 'desc'
  })
  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @ApiProperty({
    description: 'Page number',
    example: 1
  })
  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
