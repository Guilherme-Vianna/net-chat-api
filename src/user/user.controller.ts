import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @HttpCode(201)
  @Post()
  create(@Body() dto: CreateUserDto): Promise<any> {
    return this.userService.create(dto);
  }

  @HttpCode(200)
  @Get(':id')
  getById(@Param('id') id: string): Promise<any> {
    return this.userService.getById(id);
  }

  @HttpCode(200)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<any> {
    return this.userService.update(id, dto);
  }

  // TODO: CONSTRUCT DELETE ROUTE
}
