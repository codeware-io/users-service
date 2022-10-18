import { Module } from '@nestjs/common';

import {
  JwtStrategy,
  GoogleAuthStrategy,
  FacebookStrategy,
} from './strategies';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleAuthStrategy, FacebookStrategy],
})
export class AuthModule {}
