export class MessageViewDto {
  constructor(
    id: string,
    message: string,
    sender_id: string,
    dest_id: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.message = message;
    this.id = id;
    this.sender_id = sender_id;
    this.dest_id = dest_id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  id: string;
  message: string;
  sender_id: string;
  dest_id: string;
  createdAt: Date;
  updatedAt: Date;
}
