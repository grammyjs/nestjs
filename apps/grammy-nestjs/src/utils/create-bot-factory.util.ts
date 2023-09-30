import { Bot } from 'grammy';
import { GrammyModuleOptions } from '../interfaces';
import { Logger } from '@nestjs/common';
import { Context } from 'grammy/out/context';

const logger = new Logger('nestjs-grammy:create-bot-factory.util');

export async function createBotFactory<C extends Context = Context>(
  options: GrammyModuleOptions,
): Promise<Bot<C>> {
  const bot = new Bot<C>(options.token, options.options);

  if (options.middlewares) {
    bot.use(...options.middlewares);
  }

  if (!bot.isInited()) {
    await bot.init();
    logger.debug(`To optimize (for example):`);
    logger.debug(`export BOT_INFO='${JSON.stringify(bot.botInfo)}'`);
    logger.debug(`(and in forRoot():)`);
    logger.debug(`options: {botInfo: JSON.parse(process.env.BOT_INFO)},`);
  }

  logger.debug(`createBotFactory creating bot: `, options.botName);

  return bot;
}
