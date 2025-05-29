import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { AuthModule } from './modules/auth/auth.module';
import { EducationModule } from './modules/education/education.module';
import { ExperienceModule } from './modules/experience/experience.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DataBaseModule,
    UsersModule,
    CandidatesModule,
    AuthModule,
    EducationModule,
    ExperienceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
