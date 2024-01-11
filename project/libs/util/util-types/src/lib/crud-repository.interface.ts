import { Entity, EntityIdType, DefaultPojoType } from './entity.interface';

export interface CRUDRepository<
EntityType extends Entity<EntityIdType, PojoType>,
PojoType = DefaultPojoType
> {
  findById: (uuid: EntityType['id']) => Promise<EntityType | null>;
  save: (entity: EntityType) => Promise<EntityType>;
  update: (uuid: EntityType['id'], entity: EntityType) => Promise<EntityType>;
  deleteById: (uuid: EntityType['id']) => Promise<void>;
}
