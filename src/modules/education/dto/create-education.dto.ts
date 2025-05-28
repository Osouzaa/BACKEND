import { IsString, IsOptional, IsInt, IsEnum, Length } from 'class-validator';
import { EducationProgress } from 'src/common/enums/education-status.enum';

export class CreateEducationDto {
  @IsString()
  @Length(1, 50)
  level: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  courseName?: string;

  @IsString()
  @Length(1, 100)
  institution: string;

  @IsInt()
  graduationYear: number;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  documentUrl?: string;

  @IsEnum(EducationProgress)
  progress: EducationProgress;
}
