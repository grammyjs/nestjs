import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import debug from 'debug';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const log = debug('bot:response-time.interceptor');

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          log(`Response time via interceptor: ${Date.now() - start}ms`),
        ),
      );
  }
}
