import { NestjsGrammyModule } from '@grammyjs/nestjs';
import { Module } from '@nestjs/common';

import { FirebaseBotName } from './bot/bot.constants';
import { FirebaseCommandModule } from './bot/command.module';

@Module({
  imports: [
    NestjsGrammyModule.forRoot({
      botName: FirebaseBotName,
      options: { botInfo: JSON.parse(process.env.BOT_INFO) },
      token: process.env.BOT_TOKEN,
      useWebhook: true,
      include: [FirebaseCommandModule],
    }),
    FirebaseCommandModule,
  ],
})
export class CommandModule {}
