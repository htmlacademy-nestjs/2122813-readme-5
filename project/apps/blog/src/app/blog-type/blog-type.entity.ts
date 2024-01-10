import { Entity } from '@project/util/util-types';
import { Type } from '@project/shared/app-types';

export class BlogTypeEntity implements Type, Entity<string> {
  public typeId: number;
  public title: string;

  constructor(data: Type) {
    if (!data.title) {
      throw new Error('Type title is required');
    }

    this.fillEntity(data);
  }

  public fillEntity(entity: Type) {
    this.title = entity.title;
    this.typeId = entity.typeId;
  }

  public toPOJO(): Record<string, unknown> {
    return {
      id: this.typeId,
      title: this.title,
    }
  }
}
