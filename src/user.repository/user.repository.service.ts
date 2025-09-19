import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user-dto';
import { UpdateUserDto } from '../user/dto/update-user-dto';
import { UserDto } from '../types/UserDto';

@Injectable()
export class UserRepositoryService {
  constructor(readonly prismaService: PrismaService) {}

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const email = dto.email.toLowerCase().trim();

    const existing = await this.prismaService.users.findUnique({
      where: { email },
    });
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const password_hash = await bcrypt.hash(dto.password, 12);

    const user = await this.prismaService.users.create({
      data: {
        email,
        password_hash,
        name: dto.username,
      },
    });

    return user;
  }

  async getById(id: string): Promise<UserDto | null> {
    const search = await this.prismaService.users.findUnique({
      where: { id },
    });

    if (!search) {
      return null;
    }

    return search;
  }

  async getByEmailOrUsername(emailOrUsername: string): Promise<UserDto | null> {
    const search = await this.prismaService.users.findFirst({
      where: {
        OR: [
          { email: { contains: emailOrUsername } },
          { name: { startsWith: emailOrUsername } },
        ],
      },
    });

    if (!search) {
      return null;
    }

    return search;
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserDto> {
    const password_hash = await bcrypt.hash(dto.password, 12);

    return this.prismaService.users.update({
      where: { id },
      data: { email: dto.email, password_hash },
    });
  }
}
