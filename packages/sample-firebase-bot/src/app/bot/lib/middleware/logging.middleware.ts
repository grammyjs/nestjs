import debug from 'debug'
const log = debug('bot:logging.middleware')

import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { Bot, Context } from 'grammy'
import { InjectBot } from '@grammyjs/nestjs'
import { FirebaseBotName } from '../../bot.constants'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
  ) {
    log(`We are starting the LoggerMiddleware!`)
  }

  use(req: Request, res: Response, next: NextFunction) {
    log(`Request: ${req.url} with ${req.query}`, req.headers)
    next()
  }
}
