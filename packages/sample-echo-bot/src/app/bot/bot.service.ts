import { InjectBot } from '@grammyjs/nestjs';
import { Injectable } from '@nestjs/common';
import debug from 'debug';
import { Bot, Context } from 'grammy';

import { EchoBotName } from './bot.constants';

const log = debug('bot:echo.service');

@Injectable()
export class EchoService {
  constructor(@InjectBot(EchoBotName) private readonly bot: Bot<Context>) {
    log('EchoService starting ');
  }
  echo(text: string): string {
    return `Echo: ${text}`;
  }
  showBot() {
    log(
      `I am bot id=${this.bot.botInfo.id}, username=${this.bot.botInfo.username}`,
    );
  }
}
