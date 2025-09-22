import type { Prisma } from 'generated/prisma';

export type UserDto = Prisma.UsersGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
    password_hash: true;
    created_at: true;
    updated_at: true;
  };
}>;
