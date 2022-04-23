import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { GrammyArgumentsHost } from '@grammyjs/nestjs'
import { Context } from 'grammy'

@Catch()
export class GrammyExceptionFilter implements ExceptionFilter {
  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const telegrafHost = GrammyArgumentsHost.create(host)
    const ctx = telegrafHost.getContext<Context>()

    await ctx.reply(`<b>Error</b>: ${exception.message}`)
  }
}
