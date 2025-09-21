import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
