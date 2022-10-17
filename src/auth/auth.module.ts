import { Module } from '@nestjs/common';

import { GoogleAuthStrategy } from './strategies/googleAuth.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthStrategy],
})
export class AuthModule {}
