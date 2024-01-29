export class CreatePostDto {
  public postId?: number;
  public title?: string;
  public description?: string;
  public link?: string;
  public announce?: string;
  public author?: string;
  public photo?: string;
  public userId: string;
  public type: string;
  public originUserId?: string;
  public originPostId?: number;
  public isRepost?: boolean;
}
