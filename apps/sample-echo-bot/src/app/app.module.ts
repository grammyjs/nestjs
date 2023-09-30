import { NestjsGrammyModule } from '@grammyjs/nestjs';
import { Logger, Module } from '@nestjs/common';

import { EchoBotName } from './bot/bot.constants';
import { EchoBotModule } from './bot/bot.module';

const logger = new Logger('bot:app.module');

@Module({
  imports: [
    NestjsGrammyModule.forRoot({
      botName: EchoBotName,
      token: process.env.BOT_TOKEN,
      include: [EchoBotModule],
      pollingOptions: {
        allowed_updates: ['chat_member', 'message', 'callback_query'],
      },
    }),
    EchoBotModule,
  ],
})
export class AppModule {
  constructor() {
    logger.debug(`Initializing AppModule`);
  }
}
