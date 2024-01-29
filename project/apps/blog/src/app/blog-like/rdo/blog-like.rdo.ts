import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @ApiProperty({
    description: 'Post ID'
  })
  @Expose()
  public postId: number;

  @ApiProperty({
    description: 'User id'
  })
  @Expose()
  public userId: string;

}
