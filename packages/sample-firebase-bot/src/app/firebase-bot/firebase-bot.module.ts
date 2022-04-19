import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { FirebaseBotService } from './firebase-bot.service'
import { FirebaseBotController } from './firebase-bot.controller'
import { FirestoreService } from '../common/firestore.service'
import { webhookCallback } from 'grammy'

@Module({
  controllers: [FirebaseBotController],
  providers: [FirebaseBotService, FirestoreService],
  imports: [],
})
export class FirebaseBotModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(webhookCallback).forRoutes('bot')
  }
}
