import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { GetUserPrisma } from '../types/GetUserPrisma';
import { CreateUserDto } from '../services/user/dto/create-user-dto';
import { UpdateUserDto } from '../services/user/dto/update-user-dto';

@Injectable()
export class UserRepository {
  constructor(readonly prismaService: PrismaService) {}

  async createUser(dto: CreateUserDto): Promise<any> {
    const email = dto.email.toLowerCase().trim();

    const existing = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const password_hash = await bcrypt.hash(dto.password, 12);

    return this.prismaService.$transaction(async (prisma) => {
      const existingTags = await prisma.tags.findMany({
        where: {
          id: { in: dto.tags_ids },
          is_deleted: false,
        },
      });

      if (existingTags.length !== dto.tags_ids.length) {
        throw new ConflictException('One or more tags do not exist');
      }

      const user = await prisma.users.create({
        data: {
          email,
          password_hash,
          name: dto.username,
        },
      });

      await prisma.usersTags.createMany({
        data: dto.tags_ids.map((tagId) => ({
          user_id: user.id,
          tag_id: tagId,
        })),
      });

      return prisma.users.findUnique({
        where: { id: user.id },
        include: {
          UsersTags: {
            include: {
              tag: true,
            },
          },
        },
      });
    });
  }

  async getById(id: string): Promise<GetUserPrisma | null> {
    const search = await this.prismaService.users.findUnique({
      where: { id },
      include: {
        UsersTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!search) {
      return null;
    }

    return search;
  }

  async getByEmailOrUsername(
    emailOrUsername: string,
  ): Promise<GetUserPrisma | null> {
    const search = await this.prismaService.users.findFirst({
      where: {
        OR: [
          { email: { contains: emailOrUsername } },
          { name: { startsWith: emailOrUsername } },
        ],
      },
      include: {
        UsersTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!search) {
      return null;
    }

    return search;
  }

  async update(id: string, dto: UpdateUserDto): Promise<any> {
    return this.prismaService.$transaction(async (prisma) => {
      const password_hash = dto.password
        ? await bcrypt.hash(dto.password, 12)
        : undefined;

      const existingTags = await prisma.tags.findMany({
        where: {
          id: { in: dto.tags_ids },
          is_deleted: false,
        },
      });

      if (existingTags.length !== dto.tags_ids.length) {
        throw new ConflictException('One or more tags do not exist');
      }

      await prisma.usersTags.deleteMany({
        where: { user_id: id },
      });

      if (dto.tags_ids.length > 0) {
        await prisma.usersTags.createMany({
          data: dto.tags_ids.map((tagId) => ({
            user_id: id,
            tag_id: tagId,
          })),
        });
      }

      return prisma.users.update({
        where: { id },
        data: {
          password_hash: password_hash,
          ...(dto.email && { email: dto.email }),
        },
        include: {
          UsersTags: {
            include: {
              tag: true,
            },
          },
        },
      });
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.users.delete({
      where: {
        id,
      },
    });
  }
}
