import { InjectBot } from '@grammyjs/nestjs';
import { Module } from '@nestjs/common';
import debug from 'debug';
import { Bot, Context } from 'grammy';

import { EchoBotName } from './bot.constants';
import { EchoService } from './bot.service';
import { EchoUpdate } from './bot.update';
import { ResponseTime } from './lib';

const log = debug('bot:bot.module');

@Module({
  providers: [EchoService, EchoUpdate],
  imports: [],
})
export class EchoBotModule {
  constructor(@InjectBot(EchoBotName) private readonly bot: Bot<Context>) {
    bot.use(ResponseTime);
    log('EchoService starting ');
  }
}
