import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { ResponseDto } from 'src/types/ResponseDto';
import { MessageViewDto } from 'src/types/MessageViewDto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { MessageQueryDto } from '../../validators/MessageQueryDto';

@UseGuards(AuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll(
    @Query() query: MessageQueryDto,
  ): Promise<ResponseDto<MessageViewDto[]>> {
    const response = await this.messageService.get(
      Number(query.page),
      Number(query.page_size),
      query.sender_id,
      query.dest_id,
    );
    return new ResponseDto({
      data: response.data_view,
      actual_page: Number(query.page),
      actual_take: Number(query.page_size),
      total: response.total,
      remaining: response.remaining,
    });
  }
}
