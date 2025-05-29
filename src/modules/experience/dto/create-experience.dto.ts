import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateExperienceDto {
  @IsString()
  @MaxLength(100)
  company: string;

  @IsString()
  @MaxLength(100)
  position: string;

  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  documentUrl?: string;

  @IsUUID()
  candidateId: string;
}
