import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(readonly userService: UserService) { }

    // async signIn(username: string, pass: string): Promise<any> {
    //     return result;
    // }
}
