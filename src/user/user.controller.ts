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
import { UserDto } from '../types/UserDto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post()
  create(@Body() dto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(dto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get(':id')
  getById(@Param('id') id: string): Promise<any> {
    return this.userService.getById(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<any> {
    return this.userService.update(id, dto);
  }

  // TODO: CONSTRUCT DELETE ROUTE
}
