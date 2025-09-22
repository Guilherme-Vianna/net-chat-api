import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { JwtPayload } from '../types/JwtPayload';

@Controller('auth')
export class AuthController {
  constructor(readonly service: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: LoginDto): Promise<JwtPayload> {
    return this.service.signIn(dto.username, dto.password);
  }
}
