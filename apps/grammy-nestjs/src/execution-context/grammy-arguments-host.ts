import { ArgumentsHost } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { TgArgumentsHost } from './tg-arguments-host.interface';
import { Context } from 'grammy';

export class GrammyArgumentsHost
  extends ExecutionContextHost
  implements TgArgumentsHost
{
  static create(context: ArgumentsHost): GrammyArgumentsHost {
    const type = context.getType();
    const tgContext = new GrammyArgumentsHost(context.getArgs());
    tgContext.setType(type);

    return tgContext;
  }

  getContext<T extends Context = Context>(): T {
    return this.getArgByIndex(0);
  }

  getNext<T = any>(): T {
    return this.getArgByIndex(1);
  }
}
