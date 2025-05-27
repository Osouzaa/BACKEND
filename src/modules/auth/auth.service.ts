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
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;

    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        throw new UnauthorizedException('Incorrect password');
      }

      const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        cpf: user.cpf,
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

  async register(registerUserDto: RegisterUserDto) {
    try {
      const { name, surname, email, password, cpf } = registerUserDto;

      const userExists = await this.userRepository.findOne({
        where: { email },
      });
      if (userExists) {
        throw new BadRequestException(
          'User already registered with this email.',
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = this.userRepository.create({
        name,
        surname,
        email,
        password: hashedPassword,
        cpf,
      });

      await this.userRepository.save(newUser);

      return {
        id: newUser.id,
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
      };
    } catch (error) {
      console.error('Error in register:', error);

      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Internal error while trying to register user',
      );
    }
  }
}
