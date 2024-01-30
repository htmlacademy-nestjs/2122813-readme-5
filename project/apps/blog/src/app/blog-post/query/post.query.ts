import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_BY } from '../blog-post.constant';
import { PostType } from '@project/shared/app-types';
export class PostQuery {
  @ApiProperty({
    description: 'Limit',
    example: 25
  })
  @Transform(({ value } ) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;
  @ApiProperty({
    description: 'Type',
    example: 'text'
  })
  @Transform(({ value }) => value)
  @IsOptional()
  public type?: PostType;
  @ApiProperty({
    description: 'User ID',
    example: '1'
  })
  @IsOptional()
  public userId?: string;
  @ApiProperty({
    description: 'Sort direction',
    example: 'desc'
  })
  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @ApiProperty({
    description: 'Page',
    example: 1
  })
  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;

  @ApiProperty({
    description: 'Sort by',
    example: 'createdAt'
  })
  @IsIn(['createdAt', 'likes', 'comments'])
  @IsOptional()
  public sortBy?: 'createdAt' | 'likes' | 'comments' = DEFAULT_SORT_BY;

  @ApiProperty({
    description: 'Tag',
    example: 'tag'
  })
  @IsOptional()
  public tag?: string = '';
}
