import { ContextType, ExecutionContext } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { TgArgumentsHost } from './tg-arguments-host.interface';

export type GrammyContextType = 'grammy' | ContextType;

export class GrammyExecutionContext
  extends ExecutionContextHost
  implements TgArgumentsHost
{
  static create(context: ExecutionContext): GrammyExecutionContext {
    const type = context.getType();
    const tgContext = new GrammyExecutionContext(
      context.getArgs(),
      context.getClass(),
      context.getHandler(),
    );
    tgContext.setType(type);

    return tgContext;
  }

  getType<TContext extends string = GrammyContextType>(): TContext {
    return super.getType();
  }

  getContext<T = any>(): T {
    return this.getArgByIndex(0);
  }

  getNext<T = any>(): T {
    return this.getArgByIndex(0);
  }
}
