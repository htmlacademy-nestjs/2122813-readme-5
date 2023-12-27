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
      .save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existedUser = await this.blogUserRepository.findByEmail(email);

    if (!existedUser) {
      throw new NotFoundException(AuthError.AUTH_USER_NOT_FOUND);
    }

    if (!await existedUser.comparePassword(password)) {
      throw new UnauthorizedException(AuthError.AUTH_USER_PASSWORD_WRONG);
    }

    return existedUser;
  }

  public async getUser(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (! existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return existUser;
  }
}
