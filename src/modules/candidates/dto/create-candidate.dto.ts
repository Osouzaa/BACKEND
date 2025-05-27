import { IsString, IsEmail, IsDateString, Length, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(10, 20)
  phone: string;

  @IsString()
  @Length(11, 14)
  cpf: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  birthDate: string; // usar string para receber data em ISO

  @IsString()
  @Length(2, 20)
  gender: string;

  @IsString()
  @Length(2, 100)
  city: string;

  @IsString()
  @Length(2, 2)
  state: string;

  @IsString()
  @Length(5, 10)
  zipCode: string;

  @IsString()
  @IsOptional()
  urlZipCode?: string;
}
