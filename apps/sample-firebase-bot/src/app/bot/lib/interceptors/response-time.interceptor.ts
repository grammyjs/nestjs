import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';

const logger = new Logger('bot:response-time.interceptor');

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    const start = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          logger.log(`Response time via interceptor: ${Date.now() - start}ms`),
        ),
      );
  }
}
