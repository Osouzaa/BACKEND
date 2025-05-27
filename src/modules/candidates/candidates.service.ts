import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) { }

  async create(createCandidateDto: CreateCandidateDto) {
    try {
      const existingCandidate = await this.findByCpf(createCandidateDto.cpf);

      if (existingCandidate) {
        throw new ConflictException('Candidate already registered.');
      }

      const passwordHash = await bcrypt.hash(createCandidateDto.password, 8);

      const newCandidate = this.candidateRepository.create({
        ...createCandidateDto,
        passwordHash,
      });

      await this.candidateRepository.save(newCandidate);

    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error('Erro ao criar candidato:', error);
      throw new InternalServerErrorException('Erro ao criar candidato.');
    }
  }

  async findByCpf(cpf: string): Promise<Candidate | null> {
    const candidate = await this.candidateRepository.findOne({
      where: { cpf },
    });
    return candidate || null;
  }

  // TODO: REALIZAR CRIAÇÃO DE PAGINAÇÃO
  async findAll() {
    try {
      const candidates = await this.candidateRepository.find({
        select: [
          "id",
          'birthDate',
          'city',
          'createdAt',
          'email',
          'gender',
          'name',
          'phone',
          'state',
          'updatedAt',
          'urlZipCode',
          'verifiedAt',
        ]
      });

      return candidates
    } catch (error) {
      console.error('Erro ao buscar candidatos:', error);
      throw new InternalServerErrorException('Erro ao buscar candidatos.');
    }
  }

  async findOne(id: string): Promise<Omit<Candidate, 'passwordHash'>> {
    try {
      const candidate = await this.candidateRepository.findOne({ where: { id } });

      if (!candidate) {
        throw new NotFoundException(`Candidate with id ${id} not found.`);
      }

      const { passwordHash, ...result } = candidate;
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error('Erro ao buscar candidato:', error);
      throw new InternalServerErrorException('Erro ao buscar candidato.');
    }
  }

  async update(id: string, updateCandidateDto: UpdateCandidateDto) {
    try {
      const candidate = await this.candidateRepository.findOne({ where: { id } });

      if (!candidate) {
        throw new NotFoundException(`Candidate with id ${id} not found.`);
      }

      if (updateCandidateDto.cpf && updateCandidateDto.cpf !== candidate.cpf) {
        const cpfExists = await this.findByCpf(updateCandidateDto.cpf);
        if (cpfExists) {
          throw new ConflictException('Another candidate with this CPF already exists.');
        }
      }

      await this.candidateRepository.update(id, updateCandidateDto);

      const updatedCandidate = await this.candidateRepository.findOne({ where: { id } });
      if (!updatedCandidate) {
        throw new InternalServerErrorException('Erro ao atualizar candidato.');
      }

      const { passwordHash, ...result } = updatedCandidate;
      return result;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      console.error('Erro ao atualizar candidato:', error);
      throw new InternalServerErrorException('Erro ao atualizar candidato.');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const candidate = await this.candidateRepository.findOne({ where: { id } });

      if (!candidate) {
        throw new NotFoundException(`Candidate with id ${id} not found.`);
      }

      await this.candidateRepository.delete(id);

      return { message: `Candidate with id ${id} successfully removed.` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error('Erro ao remover candidato:', error);
      throw new InternalServerErrorException('Erro ao remover candidato.');
    }
  }
}
