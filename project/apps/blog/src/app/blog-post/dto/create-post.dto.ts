export class CreatePostDto {
  public title?: string;
  public description?: string;
  public link?: string;
  public announce?: string;
  public author?: string;
  public photo?: string;
  public userId: string;
  public type: number;
}
