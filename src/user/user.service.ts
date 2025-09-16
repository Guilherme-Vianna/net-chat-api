import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepositoryService } from '../user.repository/user.repository.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(readonly repository: UserRepositoryService) {}

  async create(dto: CreateUserDto) {
    return this.repository.createUser(dto);
  }

  async getById(id: string): Promise<any> {
    const user = await this.repository.getById(id);
    if (user == null) throw new NotFoundException('User not found');
    return user;
  }

  async getByEmailOrUsername(emailOrUsername: string): Promise<any> {
    const user = await this.repository.getByEmailOrUsername(emailOrUsername);
    if (user == null) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<any> {
    const user = await this.repository.update(id, dto);
    return user;
  }
}
