/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-var-requires */
import { InjectBot } from '@grammyjs/nestjs'
import { Injectable } from '@nestjs/common'
import debug from 'debug'
import { Bot, Context } from 'grammy'

import { FirebaseBotName } from './bot.constants'

const log = debug('bot:firebase-bot.service')

// import { FirestoreUtils } from '../common/FirestoreUtils'

@Injectable()
export class FirebaseBotService {
  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
  ) {
    log(`We are starting the FirebaseBotService!`, bot.isInited() ? bot.botInfo.first_name : '(pending)')
  }
  showBot(): void {
    log(`I am bot id=${this.bot.botInfo.id}, username=${this.bot.botInfo.username}`)
  }
}
