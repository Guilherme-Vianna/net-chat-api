import type { Prisma } from 'generated/prisma';
import { GetUserPrisma } from './GetUserPrisma';

export class UserViewDto {
  constructor(dto: GetUserPrisma) {
    this.id = dto.id;
    this.email = dto.email;
    this.name = dto.name;
    this.created_at = dto.created_at;
    this.updated_at = dto.updated_at;
  }
  id: string;
  email: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
