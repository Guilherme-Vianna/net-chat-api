import { GetMessagePrisma } from './GetMessagePrisma';

export class GetMessageRepository {
  constructor(messages: GetMessagePrisma[], total: number, remaining: number) {
    this.messages = messages;
    this.total = total;
    this.remaining = remaining;
  }
  messages: GetMessagePrisma[];
  total: number;
  remaining: number;
}
