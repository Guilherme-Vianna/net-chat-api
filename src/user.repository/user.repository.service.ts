import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepositoryService {
    constructor(readonly prismaService: PrismaService) { }

    async createUser(input: { email: string; password: string; name: string }) {
        const email = input.email.toLowerCase().trim();

        const existing = await this.prismaService.users.findUnique({ where: { email } });
        if (existing) {
            throw new ConflictException('Email already in use');
        }

        const password_hash = await bcrypt.hash(input.password, 12);

        const user = await this.prismaService.users.create({
            data: {
                email,
                password_hash,
                name: input.name,
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
}