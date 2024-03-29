import { InjectBot } from '@grammyjs/nestjs';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Bot, Context, webhookCallback } from 'grammy';

import { FirebaseBotName } from './bot.constants';
import { FirebaseBotService } from './bot.service';
import { WebhookUpdater } from './bot.update';
import { ResponseTime } from './lib';
import { FirestoreService } from './lib/firestore/firestore.service';

const log = new Logger('bot:firebase-bot.module');

@Module({
  providers: [FirebaseBotService, FirestoreService, WebhookUpdater],
  imports: [],
})
export class FirebaseWebhookModule implements NestModule {
  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
  ) {
    log.debug(`FirebaseWebhookModule created`);
    bot.use(ResponseTime);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(webhookCallback(this.bot, 'express')).forRoutes('*');
  }
}
