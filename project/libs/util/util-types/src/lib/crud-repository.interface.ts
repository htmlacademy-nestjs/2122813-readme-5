import { Entity, EntityIdType } from './entity.interface';

export interface CRUDRepository<T extends Entity<EntityIdType>> {
  findById: (uuid: T['id']) => Promise<T | null>;
  save: (entity: T) => Promise<T>;
  update: (uuid: T['id'], entity: T) => Promise<T>;
  deleteById: (uuid: T['id']) => Promise<void>;
}
