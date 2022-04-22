import { Controller, Param, Put } from '@nestjs/common'
import { Bot, Context } from 'grammy'
import { FirebaseBotName } from './bot.constants'
import { InjectBot } from '@grammyjs/nestjs'
import { FirebaseBotService } from './bot.service'

import debug from 'debug'
const log = debug('bot:firebase-bot.controller')

@Controller()
export class FirebaseCommandController {
  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
    private readonly appService: FirebaseBotService,
  ) {
    log(`We are starting the FirebaseBotController!`, bot.isInited() ? bot.botInfo.first_name : '(pending)')
  }

  @Put('/:action')
  async putSomething(@Param('action') action: string): Promise<void> {
    log(`Received ${action}`)
    // TODO: authorize
    switch (action) {
      case 'show':
        return this.appService.botInfo()
    }
  }
}
