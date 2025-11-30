/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const http = context.switchToHttp();
    const request = http.getRequest<Request>() as any;

    const method = request?.method;
    const url = request?.url;

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        // eslint-disable-next-line no-console
        console.log(`[INT] ${method} ${url} - ${duration}ms`);
      }),
    );
  }
}
