import { InjectBot } from '@grammyjs/nestjs';
import { Controller, Logger, Param, Put } from '@nestjs/common';
import { Bot, Context } from 'grammy';

import { FirebaseBotName } from './bot.constants';
import { FirebaseBotService } from './bot.service';

const logger = new Logger('bot:firebase-bot.controller');

@Controller()
export class FirebaseCommandController {
  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
    private readonly appService: FirebaseBotService,
  ) {
    logger.log(
      `We are starting the FirebaseBotController!`,
      this.bot.isInited() ? this.bot.botInfo.first_name : '(pending)',
    );
  }

  @Put('/:action')
  async putSomething(@Param('action') action: string): Promise<void> {
    logger.log(`Received ${action}`);

    // TODO: authorize
    switch (action) {
      case 'show':
        return this.appService.showBot();
    }
  }
}
