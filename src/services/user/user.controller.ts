import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUserPrisma } from 'src/types/GetUserPrisma';
import { UserViewDto } from '../../types/UserViewDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @HttpCode(200)
  @Post('recover-password')
  async resetPassword(): Promise<void> {
    await this.userService.recoverPassword();
  }
  //
  // @UseGuards(AuthGuard)
  // @HttpCode(200)
  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() dto: UpdateUserDto,
  // ): Promise<UserDto> {
  //   return this.userService.update(id, dto);
  // }

  // TODO: CONSTRUCT DELETE ROUTE
}
