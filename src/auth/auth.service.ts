import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../types/JwtPayload';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    readonly userService: UserService,
    readonly jwtService: JwtService,
  ) {}

  async signIn(usernameOrEmail: string, pass: string): Promise<JwtPayload> {
    const user = await this.userService.getByEmailOrUsername(usernameOrEmail);

    const isPasswordValid = await bcrypt.compare(pass, user.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.name,
      email: user.email,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET,
    });

    return {
      access_token: token,
    };
  }
}
