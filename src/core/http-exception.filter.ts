/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();

      const message =
        typeof response === 'string'
          ? response
          : ((response as any).message ?? 'Error');

      this.logger.error(
        `[${req.method}] ${req.url} ${status} - ${JSON.stringify(message)}`,
      );

      res.status(status).json({
        statusCode: status,
        message,
        timestamp,
      });
    } else {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      const message = 'Internal server error';

      this.logger.error(
        `[${req.method}] ${req.url} ${status} - ${String(exception)}`,
      );

      res.status(status).json({
        statusCode: status,
        message,
        timestamp,
      });
    }
  }
}
