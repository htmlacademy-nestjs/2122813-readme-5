import { Injectable, NotFoundException, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthUserMessage } from './auth.constant';
import { User } from '@project/shared/app-types';
import { jwtConfig } from '@project/config/config-users';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/util/util-core';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(AuthUserMessage.NotFound);
    }
    const blogUserEntity = new BlogUserEntity(existUser);
    if (!await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthUserMessage.WrongPassword);
    }
    return blogUserEntity.toObject();
  }

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)
    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }
}
