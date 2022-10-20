import { ConfigModule, ConfigService } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import {
  JwtStrategy,
  GoogleAuthStrategy,
  FacebookStrategy,
} from './strategies';
import { UsersModule } from 'src/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService): Promise<JwtModuleOptions> => ({
        secret: config.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: config.get<string>('jwt.expires'),
        },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleAuthStrategy, FacebookStrategy],
})
export class AuthModule {}
