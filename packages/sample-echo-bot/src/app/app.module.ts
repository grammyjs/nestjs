import { NestjsGrammyModule } from '@grammyjs/nestjs'
import { Module } from '@nestjs/common'
import debug from 'debug'

import { EchoBotName } from './bot/bot.constants'
import { EchoBotModule } from './bot/bot.module'

const log = debug('bot:app.module')

@Module({
  imports: [
    NestjsGrammyModule.forRoot({
      botName: EchoBotName,
      options: { botInfo: JSON.parse(process.env.BOT_INFO) },
      token: process.env.BOT_TOKEN,
      include: [EchoBotModule],
    }),
    EchoBotModule,
  ],
})
export class AppModule {
  constructor() {
    log(`Initializing AppModule`)
  }
}
