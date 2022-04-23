import debug from 'debug'
const log = debug('bot:firebase-bot.module')

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { FirebaseBotService } from './bot.service'
import { FirestoreService } from './lib/firestore/firestore.service'
import { Bot, Context, webhookCallback } from 'grammy'
import { InjectBot } from '@grammyjs/nestjs'
import { FirebaseBotName } from './bot.constants'
import { WebhookUpdater } from './bot.update'
import { LoggerMiddleware } from './lib'

@Module({
  providers: [FirebaseBotService, FirestoreService, WebhookUpdater],
  imports: [],
})
export class FirebaseWebhookModule implements NestModule {
  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
  ) {
    log(`FirebaseWebhookModule created`)
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(webhookCallback(this.bot, 'express'), LoggerMiddleware).forRoutes('*')
  }
}
