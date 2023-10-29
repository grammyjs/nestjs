import { Bot, Context } from 'grammy';
import { GrammyModuleOptions } from '../interfaces';
import { Logger } from '@nestjs/common';

const logger = new Logger('nestjs-grammy:create-bot-factory.util');

export async function createBotFactory<C extends Context = Context>(
  moduleOptions: GrammyModuleOptions<C>,
): Promise<Bot<C>> {
  const bot = new Bot<C>(moduleOptions.token, moduleOptions.options);

  if (moduleOptions.middlewares) {
    bot.use(...moduleOptions.middlewares);
  }

  if (!bot.isInited()) {
    await bot.init();
    logger.debug(`To optimize (for example):`);
    logger.debug(`export BOT_INFO='${JSON.stringify(bot.botInfo)}'`);
    logger.debug(`(and in forRoot():)`);
    logger.debug(`options: {botInfo: JSON.parse(process.env.BOT_INFO)},`);
  } else {
    logger.debug(`bot.isInited() is true`);
  }

  logger.debug(`createBotFactory creating bot: `, moduleOptions.botName);

  return bot;
}
