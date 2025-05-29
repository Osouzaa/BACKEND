import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  async create(
    createEducationDto: CreateEducationDto,
    candidateId: string,
  ): Promise<Education> {
    try {
      const education = this.educationRepository.create({
        ...createEducationDto,
        candidate: { id: candidateId },
      });

      return await this.educationRepository.save(education);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create education: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<Education[]> {
    try {
      return await this.educationRepository.find({
        relations: ['candidate'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve educations: ${error.message}`,
      );
    }
  }

  async findOne(id: string): Promise<Education> {
    try {
      const education = await this.educationRepository.findOne({
        where: { id },
      });
      if (!education) {
        throw new NotFoundException(`Education with id ${id} not found`);
      }
      return education;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Failed to retrieve education: ${error.message}`,
      );
    }
  }

  async update(
    id: string,
    updateEducationDto: UpdateEducationDto,
  ): Promise<Education> {
    try {
      const education = await this.findOne(id);
      Object.assign(education, updateEducationDto);
      return await this.educationRepository.save(education);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Failed to update education: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.educationRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Education with id ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Failed to remove education: ${error.message}`,
      );
    }
  }
}
