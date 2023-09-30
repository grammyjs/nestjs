import { Bot } from 'grammy';
import { GrammyModuleOptions } from '../interfaces';

import debug from 'debug';
const log = debug('nestjs-grammy:create-bot-factory.util');

export async function createBotFactory(
  options: GrammyModuleOptions,
): Promise<Bot<any>> {
  const bot = new Bot<any>(options.token, options.options);

  bot.use(...(options.middlewares ?? []));

  if (!bot.isInited()) {
    await bot.init();
    log(`To optimize (for example):`);
    log(`export BOT_INFO='${JSON.stringify(bot.botInfo)}'`);
    log(`(and in forRoot():)`);
    log(`options: {botInfo: JSON.parse(process.env.BOT_INFO)},`);
  }

  log(`createBotFactory creating bot: `, options.botName);

  return bot;
}
