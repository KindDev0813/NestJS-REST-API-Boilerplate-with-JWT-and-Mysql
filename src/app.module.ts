import { Module } from '@nestjs/common';
import { UsersModule } from './domains/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { RedisCacheModule } from './cache/cache.module';
import * as winston from 'winston';
import options from './log.config';
import configService from './ormconfig.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    AuthModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File(options.infoFile),
        new winston.transports.File(options.errorFile),
        new winston.transports.Console(),
      ],
      exitOnError: false,
    }),
    RedisCacheModule,
  ],
})
export class AppModule {}
