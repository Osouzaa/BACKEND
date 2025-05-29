import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { LoginUserDto } from './dto/login-auth.dto';
import { Candidate } from '../candidates/entities/candidate.entity';
import { JwtPayloadUser } from './interfaces/jwt-payload-user.interface';
import { JwtPayloadCandidate } from './interfaces/jwt-payload-candidate.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {}

  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;

    try {
      let user = await this.userRepository.findOne({ where: { email } });
      let candidate: Candidate | null = null;
      let passwordHash: string | undefined;

      if (user) {
        passwordHash = user.password;
      } else {
        candidate = await this.candidateRepository
          .createQueryBuilder('candidate')
          .addSelect('candidate.passwordHash')
          .where('candidate.email = :email', { email })
          .getOne();

        if (candidate) {
          passwordHash = candidate.passwordHash;
        }
      }

      if (!passwordHash || !(await bcrypt.compare(password, passwordHash))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: JwtPayloadUser | JwtPayloadCandidate = user
        ? {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            cpf: user.cpf,
            role: 'admin',
          }
        : {
            id: candidate!.id,
            email: candidate!.email,
            name: candidate!.name,
            gender: candidate!.gender,
            role: 'candidate',
          };

      const token = this.jwtService.sign(payload);

      return { access_token: token };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Internal error while trying to login',
      );
    }
  }
}
