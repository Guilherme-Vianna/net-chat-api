import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { EmailService } from '../email/email.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, EmailService],
})
export class UserModule {}
