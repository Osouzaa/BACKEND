import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtStrategy } from './strategies/jwt.strategy';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

import { JwtModule } from '@nestjs/jwt';
import { Candidate } from '../candidates/entities/candidate.entity';
import { env } from 'src/config/env';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Candidate]),
    JwtModule.register({
      secret: env.SECRET_KEY,
      signOptions: {
        expiresIn: env.JWT_EXPIRES_IN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
