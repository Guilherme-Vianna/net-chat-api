import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserRepositoryService } from 'src/user.repository/user.repository.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepositoryService]
})
export class AuthModule { }
