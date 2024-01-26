import { ApiProperty } from '@nestjs/swagger';
import { AuthError } from '../../auth/auth.constant';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: AuthError.AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  public password: string;
}
