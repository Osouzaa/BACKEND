import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';

import { CandidatesModule } from './modules/candidates/candidates.module';

import { AuthModule } from './modules/auth/auth.module';
import { ExperienceModule } from './experience/experience.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DataBaseModule,
    UsersModule,
    CandidatesModule,
    AuthModule,
    ExperienceModule],

  controllers: [],
  providers: [],
})
export class AppModule { }
