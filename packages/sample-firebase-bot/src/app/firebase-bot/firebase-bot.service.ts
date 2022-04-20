/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-var-requires */
import debug from 'debug'
const log = debug('bot:firebase-bot.service')

import { Injectable } from '@nestjs/common'
import { Bot, Context } from 'grammy'
import { FirebaseBotName } from './firebase-bot.constants'
import { InjectBot } from '@grammyjs/nestjs'

// import { FirestoreUtils } from '../common/FirestoreUtils'

@Injectable()
export class FirebaseBotService {
  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
  ) {
    //
  }

  botInfo(): void {
    log(`FirebaseBotService!`, this.bot.botInfo)
  }
}
