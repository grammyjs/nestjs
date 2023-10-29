import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GrammyArgumentsHost } from '@grammyjs/nestjs';

@Catch()
export class GrammyExceptionFilter implements ExceptionFilter {
  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const grammyHost = GrammyArgumentsHost.create(host);
    const ctx = grammyHost.getContext();

    await ctx.reply(`<b>Error</b>: ${exception.message}`);
  }
}
