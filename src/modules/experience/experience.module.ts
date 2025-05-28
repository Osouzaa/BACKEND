import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Candidate } from '../candidates/entities/candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Experience, Candidate])],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule { }
