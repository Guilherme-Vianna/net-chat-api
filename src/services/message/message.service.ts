import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageRepository } from 'src/repositories/message.repository';
import { MessageViewDto } from 'src/types/MessageViewDto';
import { ServiceResponseViewDto } from 'src/types/ServiceResponseViewDto';

@Injectable()
export class MessageService {
  constructor(private readonly repository: MessageRepository) {}

  async get(
    page: number,
    take: number,
    sender_id: string,
    dest_id: string,
  ): Promise<ServiceResponseViewDto<MessageViewDto[]>> {
    const data = await this.repository.getMessages(
      page,
      take,
      sender_id,
      dest_id,
    );
    const messages = data.messages.map(
      (x) =>
        new MessageViewDto(
          x.id,
          x.text,
          x.user_id,
          x.recipient_id,
          x.created_at,
          x.updated_at,
        ),
    );
    return new ServiceResponseViewDto<MessageViewDto[]>(
      messages,
      data.total,
      data.remaining,
    );
  }
}
