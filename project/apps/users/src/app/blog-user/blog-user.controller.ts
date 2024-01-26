import { Post, Body, Get, Param, HttpStatus, Controller, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogUserService } from './blog-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';

@ApiTags('users')
@Controller('user')
export class BlogUserController {
  constructor(
    private readonly blogUserService: BlogUserService,
    private readonly notifyService: NotifyService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.blogUserService.register(dto);
    const { email, name } = newUser;
    await this.notifyService.registerSubscriber({ email, name })
    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.blogUserService.getUser(id);
    return fillObject(UserRdo, existUser);
  }
}
