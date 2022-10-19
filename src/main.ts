import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  // logger
  const logger = new Logger('Application');

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'warn', 'error', 'verbose'],
  });

  // configs
  const config = app.get(ConfigService);
  const port = config.get<number>('port');

  // cors
  app.enableCors();

  // global path prefix
  app.setGlobalPrefix('/api/v1');

  // prisma shutdown hook
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(+port, () =>
    logger.log(`Application is running on port ${port}`),
  );
}
bootstrap();
