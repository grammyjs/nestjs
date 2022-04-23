import debug from 'debug'
const log = debug('bot:echo.service')

import { Injectable } from '@nestjs/common'
import { Bot, Context } from 'grammy'
import { InjectBot } from '@grammyjs/nestjs'
import { EchoBotName } from './bot.constants'

@Injectable()
export class EchoService {
  constructor(@InjectBot(EchoBotName) private readonly bot: Bot<Context>) {
    log('EchoService starting ')
  }
  echo(text: string): string {
    return `Echo: ${text}`
  }
  async showBot() {
    await this.bot.init()
    log(`I am bot id=${this.bot.botInfo.id}, username=${this.bot.botInfo.username}`)
  }
}
