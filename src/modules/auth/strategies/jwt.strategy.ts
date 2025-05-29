import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { JwtPayloadUser } from '../interfaces/jwt-payload-user.interface';
import { JwtPayloadCandidate } from '../interfaces/jwt-payload-candidate.interface';
import { Candidate } from 'src/modules/candidates/entities/candidate.entity';
import { env } from 'src/config/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.SECRET_KEY,
    });
  }

  async validate(payload: JwtPayloadUser | JwtPayloadCandidate): Promise<any> {
    const { email, role } = payload;

    if (role === 'admin') {
      const user = await this.userRepository.findOne(
        {
          where: { email }
        }
      );
      if (!user) throw new UnauthorizedException('User not found');
      return { ...user, role };
    } else if (role === 'candidate') {
      const candidate = await this.candidateRepository.findOne({
        where: { email },
      });
      if (!candidate) throw new UnauthorizedException('User not found');
      return { ...candidate, role };
    }

    throw new UnauthorizedException('User not found');
  }
}
