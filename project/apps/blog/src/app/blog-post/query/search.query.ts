import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_POST_SEARCH_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../blog-post.constant';

export class SearchQuery {
  @Transform(({ value } ) => +value || DEFAULT_POST_SEARCH_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_SEARCH_COUNT_LIMIT;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @IsOptional()
  public title?: string = '';
}
