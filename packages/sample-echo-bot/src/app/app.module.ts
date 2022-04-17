import { Module } from '@nestjs/common'
import { EchoBotModule } from './echo-bot/echo.module'
import { NestjsGrammyModule } from '@grammy/nest'
import { EchoBotName } from './echo-bot/echo.constants'

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
