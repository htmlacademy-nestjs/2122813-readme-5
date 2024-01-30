import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @ApiProperty({
    description: 'Post ID',
    example: 1
  })
  @Expose()
  public postId: number;

  @ApiProperty({
    description: 'User id',
    example: '1'
  })
  @Expose()
  public userId: string;
}
