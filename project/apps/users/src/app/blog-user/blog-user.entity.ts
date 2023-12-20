import { User } from '@project/shared/app-types';
import { Entity, EntityIdType } from '@project/util/util-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity implements User, Entity<EntityIdType> {
  public id?: string;
  public avatar: string;
  public email: string;
  public name: string;
  public passwordHash: string;

  constructor(blogUser: User) {
    this.fillEntity(blogUser);
  }

  public toPOJO() {
    return {
      _id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      passwordHash: this.passwordHash
    };
  }

  public fillEntity(blogUser: User) {
    this.id = blogUser.id;
    this.avatar = blogUser.avatar;
    this.email = blogUser.email;
    this.name = blogUser.name;
    this.passwordHash = blogUser.passwordHash;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: User): BlogUserEntity {
    return new BlogUserEntity(data);
  }
}
