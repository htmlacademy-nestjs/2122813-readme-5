import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsEnum, IsNumber, IsOptional, IsUrl, Matches, MaxLength, MinLength, NotContains } from 'class-validator';
import { PostType } from '@project/shared/app-types';
import { PostError, RegExp, TagParam, TitleLength, AnnounceLength, DescriptionTextPostLength, AuthorLength, DescriptionLength } from '../blog-post.constant';
export class CreateBaseDto {
  @ApiProperty({
    description: 'Post ID',
    example: 3
  })
  @IsNumber()
  @IsOptional()
  public postId?: number;

  @ApiProperty({
    description: 'User ID',
    example: '3'
  })
  public userId: string;

  @ApiProperty({
    description: 'Type of post',
    example: 'text'
  })
  @IsEnum(PostType)
  public type: string;

  @ApiProperty({
    description: 'Origin user ID',
    example: '3'
  })
  @IsOptional()
  public originUserId?: string;

  @ApiProperty({
    description: 'Origin post ID',
    example: 3
  })
  @IsNumber()
  @IsOptional()
  public originPostId?: number;

  @ApiProperty({
    description: 'Status of repost',
    example: true
  })
  @IsOptional()
  public isRepost?: boolean;

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

export class CreateVideoPostDto extends CreateBaseDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @MinLength(TitleLength.Min)
  @MaxLength(TitleLength.Max)
  public title: string;

  @ApiProperty({
    description: 'Youtube link',
    example: 'https://www.youtube.com/watch?v=piqdKWNnqBo'
  })
  @Matches(RegExp.Video)
  public link: string;
}

export class CreateTextPostDto extends CreateBaseDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @MinLength(TitleLength.Min)
  @MaxLength(TitleLength.Max)
  public title: string;

  @ApiProperty({
    description: 'Announce text',
    example: 'Announce'
  })
  @MinLength(AnnounceLength.Min)
  @MaxLength(AnnounceLength.Max)
  public announce: string;

  @ApiProperty({
    description: 'Description text',
    example: 'Description'
  })
  @MinLength(DescriptionTextPostLength.Min)
  @MaxLength(DescriptionTextPostLength.Max)
  public description: string;
}

export class CreateQuotePostDto extends CreateBaseDto {
  @ApiProperty({
    description: 'Author quote',
    example: 'Author'
  })
  @MinLength(AuthorLength.Min)
  @MaxLength(AuthorLength.Max)
  public author: string;

  @ApiProperty({
    description: 'Description text',
    example: 'Description'
  })
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  public description: string;
}

export class CreateLinkPostDto extends CreateBaseDto {
  @ApiProperty({
    description: 'Link URL',
    example: 'https://example.com'
  })
  @IsUrl()
  public author: string;

  @ApiProperty({
    description: 'Description text',
    example: 'Description'
  })
  @IsOptional()
  @MaxLength(DescriptionLength.Max)
  public description?: string;
}

export class CreatePhotoPostDto extends CreateBaseDto {
  @ApiProperty({
    description: 'Photo URL',
    example: 'https://example.com'
  })
  @IsUrl()
  public photo: string;
}

export type CreatePostDto = CreateLinkPostDto | CreatePhotoPostDto | CreateQuotePostDto | CreateTextPostDto | CreateVideoPostDto;

export const CreateTypePostDto = {
  [PostType.Video]: CreateVideoPostDto,
  [PostType.Text]: CreateTextPostDto,
  [PostType.Link]: CreateLinkPostDto,
  [PostType.Photo]: CreatePhotoPostDto,
  [PostType.Quote]: CreateQuotePostDto
}
