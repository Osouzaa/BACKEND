import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DataBaseModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
