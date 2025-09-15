import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryService } from 'src/user.repository/user.repository.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
})
export class UserModule { }
