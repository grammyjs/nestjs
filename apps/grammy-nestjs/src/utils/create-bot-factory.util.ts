import { Bot } from 'grammy';
import { GrammyModuleOptions } from '../interfaces';
import { Logger } from '@nestjs/common';

const logger = new Logger('nestjs-grammy:create-bot-factory.util');

export async function createBotFactory(
  options: GrammyModuleOptions,
): Promise<Bot<any>> {
  const bot = new Bot<any>(options.token, options.options);

  bot.use(...(options.middlewares ?? []));

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
