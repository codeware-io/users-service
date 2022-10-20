import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientKnownRequestErrorExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let statusCode: HttpStatus;
    let message: string | unknown;
    switch (exception.code) {
      case 'P2002':
        statusCode = HttpStatus.CONFLICT;
        message = `Unique constraint failed on the constraint: ${exception?.meta?.['target']}`;

        response.status(statusCode).json({
          statusCode,
          message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;
      case 'P2025': // not found error
        statusCode = HttpStatus.NOT_FOUND;
        message = exception?.meta?.['cause'];

        response.status(statusCode).json({
          statusCode,
          message: message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;
      default:
        super.catch(exception, host);
        break;
    }
  }
}
