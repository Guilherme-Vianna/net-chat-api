import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(readonly service: AuthService) {
    }

    // @HttpCode(HttpStatus.OK)
    // @Post('login')
    // signIn(@Body() signInDto: Record<string, any>) {
    //     return this.service.signIn(signInDto.username, signInDto.password);
    // }
}
