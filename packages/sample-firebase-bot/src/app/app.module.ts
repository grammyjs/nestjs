import { Module } from '@nestjs/common'
import { FirebaseBotName } from './firebase-bot/firebase-bot.constants'
import { NestjsGrammyModule } from '@grammyjs/nestjs'
import { FirebaseBotModule } from './firebase-bot/firebase-bot.module'

@Module({
  imports: [
    NestjsGrammyModule.forRoot({
      botName: FirebaseBotName,
      options: { botInfo: JSON.parse(process.env.BOT_INFO) },
      token: process.env.BOT_TOKEN,
      useWebhook: true,
      include: [FirebaseBotModule],
    }),
    FirebaseBotModule,
  ],
})
export class AppModule {}
