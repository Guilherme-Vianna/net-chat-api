import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsOptional()
  @IsNotEmpty()
  tags_ids: string[];
}
