import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthError } from './auth.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly blogUserRepository: BlogUserMemoryRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, name, password} = dto;

    const blogUser = {
      email,
      name,
      avatar: '',
      passwordHash: ''
    };

    const existedUser = await this.blogUserRepository
      .findByEmail(email);

    if (existedUser) {
      throw new ConflictException(AuthError.AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password);

    return this.blogUserRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existedUser = await this.blogUserRepository.findByEmail(email);

    if (!existedUser) {
      throw new NotFoundException(AuthError.AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new BlogUserEntity(existedUser);
    if (!await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthError.AUTH_USER_PASSWORD_WRONG);
    }

    return blogUserEntity.toObject();
  }

  public async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }
}
