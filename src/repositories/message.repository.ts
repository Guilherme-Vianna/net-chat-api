import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetMessageRepository } from 'src/types/GetMessageRepository';

@Injectable()
export class MessageRepository {
  constructor(readonly prismaService: PrismaService) {}

  async getMessages(
    page: number,
    take: number,
    sender_id: string,
    dest_id: string,
  ): Promise<GetMessageRepository> {
    const safePage = Math.max(1, page);
    const skip = (safePage - 1) * take;

    const where = { user_id: sender_id, recipient_id: dest_id };

    const [messages, total] = await Promise.all([
      this.prismaService.messages.findMany({
        where,
        skip,
        take,
        orderBy: { created_at: 'desc' },
      }),
      this.prismaService.messages.count({ where }),
    ]);

    const totalExplored = safePage * take;
    const remaining = Math.max(total - totalExplored, 0);

    return new GetMessageRepository(messages, total, remaining);
  }
}
