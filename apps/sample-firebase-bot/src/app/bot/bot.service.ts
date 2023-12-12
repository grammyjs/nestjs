import { InjectBot } from '@grammyjs/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { Bot, Context } from 'grammy';

import { FirebaseBotName } from './bot.constants';

const logger = new Logger('bot:firebase-bot.service');

// import { FirestoreUtils } from '../common/FirestoreUtils'

@Injectable()
export class FirebaseBotService {
  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
  ) {
    logger.log(
      `We are starting the FirebaseBotService!`,
      bot.isInited() ? bot.botInfo.first_name : '(pending)',
    );
  }
  showBot(): void {
    logger.log(
      `I am bot id=${this.bot.botInfo.id}, username=${this.bot.botInfo.username}`,
    );
  }
}
