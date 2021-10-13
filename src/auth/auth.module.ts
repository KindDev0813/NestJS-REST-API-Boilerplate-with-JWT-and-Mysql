import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/domains/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import * as dotenv from 'dotenv';
import { RedisCacheModule } from 'src/cache/cache.module';
import { AuthController } from './auth.controller';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION_TIME },
    }),
    RedisCacheModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
