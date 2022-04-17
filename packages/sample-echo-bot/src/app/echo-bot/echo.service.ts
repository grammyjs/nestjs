import debug from 'debug'
const log = debug('bot:echo.service')

import { Injectable } from '@nestjs/common'
import { Bot, Context } from 'grammy'
import { InjectBot } from '@grammy/nest'
import { EchoBotName } from './echo.constants'

@Injectable()
export class EchoService {
  /*
  constructor() {
   */
  constructor(@InjectBot(EchoBotName) private readonly bot: Bot<Context>) {
    log('EchoService starting ')
  }
  echo(text: string): string {
    return `Echo: ${text}`
  }
  async showBot() {
    await this.bot.init()
    log(this.bot.botInfo)
  }
}
