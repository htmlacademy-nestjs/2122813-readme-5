import { ApiProperty } from '@nestjs/swagger';
import { Comment, PostType, Like } from '@project/shared/app-types';
import { Expose, Transform } from 'class-transformer';

export class PostRdo {
  @ApiProperty({
    description: 'Post ID',
    example: 1
  })
  @Expose()
  public postId: number;

  @ApiProperty({
    description: 'Title',
    example: 'Title'
  })
  @Expose()
  public title?: string;

  @ApiProperty({
    description: 'Description',
    example: 'Text'
  })
  @Expose()
  public description?: string;

  @ApiProperty({
    description: 'Link',
    example: 'https://example.com'
  })
  @Expose()
  public link?: string;

  @ApiProperty({
    description: 'Announce',
    example: 'Text'
  })
  @Expose()
  public announce?: string;

  @ApiProperty({
    description: 'Author',
    example: 'Text'
  })
  @Expose()
  public author?: string;

  @ApiProperty({
    description: 'Photo',
    example: 'https://example.com'
  })
  @Expose()
  public photo?: string;

  @ApiProperty({
    description: 'Date publish',
    example: '2023-08-31'
  })
  @Expose()
  public publishAt?: Date;

  @ApiProperty({
    description: 'Date publish',
    example: '2023-08-31'
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'User ID',
    example: '1'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Post status',
    example: true
  })
  @Expose()
  public isPublished: boolean;

  @ApiProperty({
    description: 'Repost status',
    example: true
  })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
    description: 'Post type',
    example: 'text'
  })
  @Expose()
  public type: PostType;

  @ApiProperty({
    description: 'Comments number',
    example: 2
  })
  @Expose()
  @Transform(({ value }) => value.length)
  public comments?: Comment[]

  @ApiProperty({
    description: 'Tags',
    example: ['tag']
  })
  @Expose()
  public tags?: string[]

  @ApiProperty({
    description: 'Likes number',
    example: 2
  })
  @Expose()
  @Transform(({ value }) => value.length)
  public likes?: Like[]
}
