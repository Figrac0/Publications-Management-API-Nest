import { Global, Module } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { TransformInterceptor } from './transform.interceptor';

@Global()
@Module({
  providers: [HttpExceptionFilter, LoggingInterceptor, TransformInterceptor],
  exports: [HttpExceptionFilter, LoggingInterceptor, TransformInterceptor],
})
export class CoreModule {}
