import { Module } from '@nestjs/common';

import { GoogleAuthStrategy } from './strategies/googleAuth.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthStrategy, FacebookStrategy],
})
export class AuthModule {}
