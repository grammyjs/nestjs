import { NestjsGrammyModule } from '@grammyjs/nestjs';
import { Module } from '@nestjs/common';

import { FirebaseBotName } from './bot/bot.constants';
import { FirebaseWebhookModule } from './bot/webhook.module';
import { UserFromGetMe } from 'grammy/out/types';

@Module({
  imports: [
    NestjsGrammyModule.forRoot({
      botName: FirebaseBotName,
      options: { botInfo: JSON.parse(process.env.BOT_INFO) as UserFromGetMe },
      token: process.env.BOT_TOKEN,
      useWebhook: true,
      include: [FirebaseWebhookModule],
    }),
    FirebaseWebhookModule,
  ],
})
export class WebhookModule {}
