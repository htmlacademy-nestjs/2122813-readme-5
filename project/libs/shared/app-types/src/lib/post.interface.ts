import { Type } from './type.interface';
import { Comment } from './comment.interface';

export interface Post {
  id?: number;
  title?: string;
  link?: string;
  announce?: string;
  description?: string;
  author?: string;
  photo?: string;
  userId: string;
  type: Type;
  comments?: Comment[];
  createdAt?: Date;
  publishAt?: Date;
}
