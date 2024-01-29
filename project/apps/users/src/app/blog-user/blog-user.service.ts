import { ConflictException, Injectable } from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserMessage } from '../auth/auth.constant';


@Injectable()
export class BlogUserService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, name, password} = dto;

    const blogUser = {
      email,
      name,
      avatar: '',
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUserMessage.Exists);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password);

    return this.blogUserRepository
      .create(userEntity);
  }

  public async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }
}
