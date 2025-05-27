import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { CandidatesModule } from './modules/candidates/candidates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DataBaseModule,
    UsersModule,
    CandidatesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
