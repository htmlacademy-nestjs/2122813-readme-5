import { Entity } from '@project/util/util-types';
import { Type } from '@project/shared/app-types';

export class BlogTypeEntity implements Entity<BlogTypeEntity>, Type {
  public typeId: number;
  public title: string;

  constructor(type: Type) {
    this.fillEntity(type);
  }

  public fillEntity(entity: Type) {
    this.title = entity.title;
    this.typeId = entity.typeId;
  }

  public toObject(): BlogTypeEntity {
    return { ...this }
  }
}
