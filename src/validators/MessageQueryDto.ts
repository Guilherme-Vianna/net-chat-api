import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class MessageQueryDto {
  @IsNumberString()
  page_size: string;

  @IsString()
  @IsNotEmpty()
  sender_id: string;

  @IsString()
  @IsNotEmpty()
  dest_id: string;

  @IsNumberString()
  page: string;
}
