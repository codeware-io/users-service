import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from 'src/config';

import { AuthModule } from 'src/auth/auth.module';
import { AppController } from './app.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
