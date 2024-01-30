import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { AuthUserMessage, PasswordLength } from '../auth.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AuthUserMessage.NotValidEmail })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  @IsString()
  public password: string;
}
