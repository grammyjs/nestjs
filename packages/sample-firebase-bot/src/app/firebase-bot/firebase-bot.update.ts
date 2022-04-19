import debug from 'debug'
const log = debug('bot:firebase-bot.update')

import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { Bot, Context } from 'grammy'
import { FirebaseBotService } from './firebase-bot.service'
import { FirebaseBotName } from './firebase-bot.constants'
import { InjectBot, Message } from '@grammyjs/nestjs'
import { AdminGuard } from '../common/guards/admin.guard'

export class FirebaseBotUpdate {
  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
    private readonly botService: FirebaseBotService,
  ) {
    console.log(`Initializing`, bot.isInited() ? bot.botInfo : '(pending)')
  }

  async onStart(): Promise<string> {
    const me = await this.bot.api.getMe()
    return `Hey, I'm ${me.first_name}`
  }

  async onHelp(): Promise<string> {
    return 'Send me any text'
  }

  // @Command('admin')
  @UseGuards(AdminGuard)
  onAdminCommand(): string {
    return 'Welcome judge'
  }

  // onMessage(@Message('text') reversedText: string): string {
  //   return this.botService.botService('Just my text: ' + reversedText)
  // }
}
