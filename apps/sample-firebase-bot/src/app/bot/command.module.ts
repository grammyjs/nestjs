import { InjectBot } from '@grammyjs/nestjs';
import { Logger, Module } from '@nestjs/common';
import { Bot, Context } from 'grammy';

import { FirebaseBotName } from './bot.constants';
import { FirebaseBotService } from './bot.service';
import { FirebaseCommandController } from './command.controller';
import { ResponseTime } from './lib';
import { FirestoreService } from './lib/firestore/firestore.service';

const logger = new Logger('bot:firebase-bot.module');

@Module({
  controllers: [FirebaseCommandController],
  providers: [FirebaseBotService, FirestoreService],
  imports: [],
})
export class FirebaseCommandModule {
  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
  ) {
    logger.log(`FirebaseBotModule created`);
    this.bot.use(ResponseTime);
  }
}
