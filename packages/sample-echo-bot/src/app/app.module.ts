import { Module } from '@nestjs/common'
import { EchoBotModule } from './bot/bot.module'
import { NestjsGrammyModule } from '@grammyjs/nestjs'
import { EchoBotName } from './bot/bot.constants'

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
export class AppModule {}
