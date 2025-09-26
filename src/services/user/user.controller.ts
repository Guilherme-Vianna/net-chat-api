import {
  Body,
  Controller,
  createParamDecorator,
  Delete,
  ExecutionContext,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { UserViewDto } from '../../types/UserViewDto';
import { UserTokenData } from '../../types/IUserTokenData';
import { UpdateUserDto } from './dto/update-user-dto';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    return request.user as UserTokenData;
  },
);

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @HttpCode(201)
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserViewDto> {
    return await this.userService.create(dto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserViewDto> {
    return await this.userService.getById(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('recover-password')
  async resetPassword(@GetUser() user: UserTokenData): Promise<void> {
    await this.userService.recoverPassword(user.email);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<any> {
    return await this.userService.update(id, dto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }
}
