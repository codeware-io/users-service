import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from 'src/config';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
