import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { ResponseDto } from 'src/types/ResponseDto';
import { MessageViewDto } from 'src/types/MessageViewDto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(AuthGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('sender_id') sender_id: string,
    @Query('dest_id') dest_id: string,
  ): Promise<ResponseDto<MessageViewDto[]>> {
    const response = await this.messageService.get(
      page,
      take,
      sender_id,
      dest_id,
    );
    return new ResponseDto({
      data: response.data_view,
      actual_page: page,
      actual_take: take,
      total: response.total,
      remaining: response.remaining,
    });
  }
}
