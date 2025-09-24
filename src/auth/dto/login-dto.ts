import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  username: string;
}
