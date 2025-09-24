import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  constructor(email: string, password: string, tags_ids: string[]) {
    this.email = email;
    this.password = password;
    this.tags_ids = tags_ids;
  }

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsNotEmpty()
  tags_ids: string[];
}
