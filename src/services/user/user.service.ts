import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserViewDto } from 'src/types/UserViewDto';
import { GetUserPrisma } from '../../types/GetUserPrisma';
import { UserRepository } from '../../repositories/user.repository';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    readonly repository: UserRepository,
    readonly emailService: EmailService,
  ) {}

  async create(dto: CreateUserDto): Promise<any> {
    const user = await this.repository.createUser(dto);
    return new UserViewDto(user);
  }

  async getById(id: string): Promise<any> {
    const user = await this.repository.getById(id);
    if (user == null) throw new NotFoundException('User not found');
    return new UserViewDto(user);
  }

  async getByEmailOrUsername(emailOrUsername: string): Promise<any> {
    const user = await this.repository.getByEmailOrUsername(emailOrUsername);
    if (user == null) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<any> {
    const result = await this.repository.update(id, dto);
    return new UserViewDto(result);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private generateRandomPassword(length: number = 12): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const allChars = uppercase + lowercase + numbers + symbols;
    let password = '';

    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }

  async recoverPassword(email: string): Promise<void> {
    const newPassword = this.generateRandomPassword();
    const user = await this.getByEmailOrUsername(email);
    if (user == null) throw new NotFoundException('User not found');
    const updateDto = new UpdateUserDto(
      user.email,
      newPassword,
      user.UsersTags.map((x) => x.tag_id),
    );
    await this.repository.update(user.id, updateDto);
    await this.emailService.sendPasswordResetEmail(newPassword, email);
  }
}
