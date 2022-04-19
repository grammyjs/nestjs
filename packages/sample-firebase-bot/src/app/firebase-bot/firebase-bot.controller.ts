import { Controller, Param, Post, Put, Body } from '@nestjs/common'
import { Bot, Context } from 'grammy'
import { FirebaseBotName } from './firebase-bot.constants'
import { InjectBot } from '@grammyjs/nestjs'
import { FirebaseBotService } from './firebase-bot.service'

import debug from 'debug'
const log = debug('bot:firebase-bot.controller')
log.log = console.log.bind(console)

@Controller()
export class FirebaseBotController {
  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
    private readonly appService: FirebaseBotService,
  ) {
    log(`We are starting the FirebaseBotController!`, bot.isInited() ? bot.botInfo : '(pending)')
  }

  @Post('/webhook')
  async postSomething(@Body() webhookBody: any): Promise<void> {
    log(`WEBHOOK POST:`, webhookBody, typeof webhookBody, this.bot)
  }

  @Put('/commands/:action')
  async putSomething(@Param('action') action: string): Promise<void> {
    // TODO: authorize
    switch (action) {
      case 'show':
        return this.appService.botInfo()
      case 'getMe':
        return this.appService.getMe()
    }
  }
}
