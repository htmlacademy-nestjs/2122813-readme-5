import { Type } from "@project/shared/app-types";

export class UpdatePostDto {
  public title?: string;
  public description?: string;
  public link?: string;
  public announce?: string;
  public author?: string;
  public photo?: string;
  public type: Type;
  public publishAt?: Date;
  public userId: string;
}
