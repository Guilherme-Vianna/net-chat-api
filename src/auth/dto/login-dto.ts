import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  username: string;
}
