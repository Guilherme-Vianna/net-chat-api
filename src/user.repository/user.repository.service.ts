import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user-dto';
import { UpdateUserDto } from '../user/dto/update-user-dto';

@Injectable()
export class UserRepositoryService {
  constructor(readonly prismaService: PrismaService) {}

  async createUser(dto: CreateUserDto) {
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
      select: {
        id: true,
        email: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }

  async getById(id: string): Promise<any | null> {
    const search = await this.prismaService.users.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!search) {
      return null;
    }

    return search;
  }

  async getByEmailOrUsername(emailOrUsername: string): Promise<any | null> {
    const search = await this.prismaService.users.findFirst({
      where: {
        OR: [
          { email: { contains: emailOrUsername } },
          { name: { startsWith: emailOrUsername } },
        ],
      },
      select: {
        password_hash: true,
      },
    });

    if (!search) {
      return null;
    }

    return search;
  }

  async update(id: string, dto: UpdateUserDto): Promise<any> {
    const password_hash = await bcrypt.hash(dto.password, 12);

    const updatedUser = await this.prismaService.users.update({
      where: { id },
      data: { email: dto.email, password_hash },
      select: {
        id: true,
        email: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });

    return updatedUser;
  }
}
