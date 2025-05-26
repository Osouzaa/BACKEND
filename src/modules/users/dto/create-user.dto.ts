import { IsString, IsEmail, Length, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 20)
  name: string;

  @IsString()
  @Length(2, 40)
  surname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(14)
  cpf: string;

  @IsString()
  @Length(6, 255)
  password: string;
}
