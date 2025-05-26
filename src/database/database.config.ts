import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { env } from "src/config/env";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      entities: [],
      options: {
        encrypt: false, // importante se estiver rodando localmente
        trustServerCertificate: true,
      },
      synchronize: true
    }),
  ],
})
export class DataBaseModule { }
