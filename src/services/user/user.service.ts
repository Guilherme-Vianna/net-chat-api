import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserViewDto } from 'src/types/UserViewDto';
import { UserDto } from '../../types/UserDto';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(readonly repository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<UserDto> {
    return this.repository.createUser(dto);
  }

  async getById(id: string): Promise<UserViewDto> {
    const user = await this.repository.getById(id);
    if (user == null) throw new NotFoundException('User not found');
    return new UserViewDto(user);
  }

  async getByEmailOrUsername(emailOrUsername: string): Promise<UserDto> {
    const user = await this.repository.getByEmailOrUsername(emailOrUsername);
    if (user == null) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserViewDto> {
    const result = await this.repository.update(id, dto);
    return new UserViewDto(result);
  }
}
