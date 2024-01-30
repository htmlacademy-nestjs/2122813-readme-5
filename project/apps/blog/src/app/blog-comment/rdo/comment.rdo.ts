import { Expose } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class CommentRdo {
  @ApiProperty({
    description: 'Comment ID',
    example: 1
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Post ID',
    example: 1
  })
  @Expose()
  public postId: number;

  @ApiProperty({
    description: 'Comment text',
    example: 'Comment text'
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'Author comment ID',
    example: '1'
  })
  @Expose()
  public userId: string;


  @ApiProperty({
    description: 'Comment date',
  })
  @Expose()
  public createdAt: Date;
}
