import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsDate, IsEnum, IsOptional, IsUrl, Matches, MaxLength, MinLength, NotContains } from 'class-validator';
import { PostType } from '@project/shared/app-types';
import { PostError, RegExp, TagParam, TitleLength, AnnounceLength, DescriptionTextPostLength, AuthorLength, DescriptionLength } from '../blog-post.constant';
export class UpdateBaseDto {
  @ApiProperty({
    description: 'User ID',
    example: '3'
  })
  @IsOptional()
  public userId?: string;

  @ApiProperty({
    description: 'Type of post',
    example: 'text'
  })
  @IsEnum(PostType)
  @IsOptional()
  public type: string;

  @ApiProperty({
    description: 'Status of repost',
    example: true
  })
  @IsOptional()
  public isRepost?: boolean;

  @ApiProperty({
    description: 'Status of publish post',
    example: false
  })
  @IsOptional()
  public isPublished?: boolean;

  @ApiProperty({
    description: 'Date of publish post',
    example: '2023-09-03'
  })
  @IsOptional()
  @IsDate()
  public publishAt?: Date;

  @ApiProperty({
    description: 'Tags of post',
    example: 'text-tag'
  })
  @IsOptional()
  @NotContains(' ', { each: true, message: PostError.TagSpaces})
  @Matches(RegExp.Tag, { each: true, message: PostError.TagStart})
  @MinLength(TagParam.MinLength, { each: true })
  @MaxLength(TagParam.MaxLength, { each: true })
  @ArrayMaxSize(TagParam.MaxCount)
  public tags?:string[];
}

export class UpdateVideoPostDto extends UpdateBaseDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @IsOptional()
  @MinLength(TitleLength.Min)
  @MaxLength(TitleLength.Max)
  public title?: string;

  @ApiProperty({
    description: 'Youtube link',
    example: 'https://www.youtube.com/watch?v=piqdKWNnqBo'
  })
  @IsOptional()
  @Matches(RegExp.Video)
  public link?: string;
}

export class UpdateTextPostDto extends UpdateBaseDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @IsOptional()
  @MinLength(TitleLength.Min)
  @MaxLength(TitleLength.Max)
  public title?: string;

  @ApiProperty({
    description: 'Announce text',
    example: 'Announce'
  })
  @IsOptional()
  @MinLength(AnnounceLength.Min)
  @MaxLength(AnnounceLength.Max)
  public announce?: string;

  @ApiProperty({
    description: 'Description text',
    example: 'Description'
  })
  @IsOptional()
  @MinLength(DescriptionTextPostLength.Min)
  @MaxLength(DescriptionTextPostLength.Max)
  public description?: string;
}

export class UpdateQuotePostDto extends UpdateBaseDto {
  @ApiProperty({
    description: 'Author quote',
    example: 'Author'
  })
  @IsOptional()
  @MinLength(AuthorLength.Min)
  @MaxLength(AuthorLength.Max)
  public author?: string;

  @ApiProperty({
    description: 'Description text',
    example: 'Description'
  })
  @IsOptional()
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  public description: string;
}

export class UpdateLinkPostDto extends UpdateBaseDto {
  @ApiProperty({
    description: 'Link URL',
    example: 'https://example.com'
  })
  @IsOptional()
  @IsUrl()
  public author?: string;

  @ApiProperty({
    description: 'Description text',
    example: 'Description'
  })
  @IsOptional()
  @MaxLength(DescriptionLength.Max)
  public description?: string;
}

export class UpdatePhotoPostDto extends UpdateBaseDto {
  @ApiProperty({
    description: 'Photo URL',
    example: 'https://example.com'
  })
  @IsOptional()
  @IsUrl()
  public photo?: string;
}

export type UpdatePostDto = UpdateLinkPostDto | UpdatePhotoPostDto | UpdateQuotePostDto | UpdateTextPostDto | UpdateVideoPostDto;

export const UpdateTypePostDto = {
  [PostType.Video]: UpdateVideoPostDto,
  [PostType.Text]: UpdateTextPostDto,
  [PostType.Link]: UpdateLinkPostDto,
  [PostType.Photo]: UpdatePhotoPostDto,
  [PostType.Quote]: UpdateQuotePostDto
}
