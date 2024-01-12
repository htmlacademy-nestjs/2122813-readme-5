export class UpdatePostDto {
  public title?: string;
  public description?: string;
  public link?: string;
  public announce?: string;
  public author?: string;
  public photo?: string;
  public type: number;
  public publishAt?: Date;
}
