import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from '../candidates/entities/candidate.entity';
import { Repository } from 'typeorm';
import { Experience } from './entities/experience.entity';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) { }

  async create(createExperienceDto: CreateExperienceDto) {
    const { candidateId, company, position } = createExperienceDto;

    const candidateExists = await this.candidateRepository.findOne({
      where: { id: candidateId },
    });

    if (!candidateExists) {
      throw new NotFoundException('Candidate not found.');
    }

    const experienceExists = await this.experienceRepository.findOne({
      where: {
        company,
        position,
        candidate: { id: candidateId },
      },
    });

    if (experienceExists) {
      throw new ConflictException(
        'Experience already registered for this candidate.',
      );
    }

    const newExperience = this.experienceRepository.create({
      ...createExperienceDto,
      candidate: candidateExists,
    });

    return await this.experienceRepository.save(newExperience);
  }

  // TODO: paginations
  async findAll(): Promise<Experience[]> {
    return await this.experienceRepository.find({
      relations: ['candidate'],
    });
  }

  async findOne(id: string): Promise<Experience> {
    const experience = await this.experienceRepository.findOne({
      where: { id },
      relations: ['candidate'],
    });

    if (!experience) {
      throw new NotFoundException('Experience not found.');
    }

    return experience;
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto) {
    const experience = await this.experienceRepository.findOne({ where: { id } });

    if (!experience) {
      throw new NotFoundException('Experience not found.');
    }

    const updatedExperience = this.experienceRepository.merge(
      experience,
      updateExperienceDto,
    );

    return await this.experienceRepository.save(updatedExperience);
  }

  async remove(id: string) {
    const experience = await this.experienceRepository.findOne({ where: { id } });

    if (!experience) {
      throw new NotFoundException('Experience not found.');
    }

    await this.experienceRepository.remove(experience);
    return { message: 'Experience successfully deleted.' };
  }
}
