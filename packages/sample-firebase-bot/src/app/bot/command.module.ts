import debug from 'debug'
const log = debug('bot:firebase-bot.module')

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { FirebaseBotService } from './bot.service'
import { FirebaseCommandController } from './command.controller'
import { FirestoreService } from './lib/firestore/firestore.service'
import { Bot, Context, webhookCallback } from 'grammy'
import { InjectBot } from '@grammyjs/nestjs'
import { FirebaseBotName } from './bot.constants'
import { LoggerMiddleware } from './lib'

@Module({
  controllers: [FirebaseCommandController],
  providers: [FirebaseBotService, FirestoreService],
  imports: [],
})
export class FirebaseCommandModule implements NestModule {
  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
  ) {
    log(`FirebaseBotModule created`)
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(webhookCallback(this.bot, 'express'), LoggerMiddleware).forRoutes('*')
  }
}
