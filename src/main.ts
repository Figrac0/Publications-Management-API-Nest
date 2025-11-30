import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './core/http-exception.filter';
import { LoggingInterceptor } from './core/logging.interceptor';
import { TransformInterceptor } from './core/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const httpExceptionFilter = app.get(HttpExceptionFilter);
  app.useGlobalFilters(httpExceptionFilter);

  const loggingInterceptor = app.get(LoggingInterceptor);
  const transformInterceptor = app.get(TransformInterceptor);
  app.useGlobalInterceptors(loggingInterceptor, transformInterceptor);

  await app.listen(3000);
}
bootstrap();
