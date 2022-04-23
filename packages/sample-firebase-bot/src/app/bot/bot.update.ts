import debug from 'debug'
const log = debug('bot:firebase-bot.update')

import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { Bot, Context } from 'grammy'
import { FirebaseBotService } from './bot.service'
import { FirebaseBotName } from './bot.constants'
import { InjectBot, Update, Message, Start, Hears, Ctx, Help, Admin } from '@grammyjs/nestjs'
import { AdminGuard, ReverseTextPipe, GrammyExceptionFilter, ResponseTimeInterceptor } from './lib'

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(GrammyExceptionFilter)
export class WebhookUpdater {
  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
    private readonly botService: FirebaseBotService,
  ) {
    log(`Initializing`, bot.isInited() ? bot.botInfo.first_name : '(pending)')
  }

  @Start()
  async onStart(@Ctx() ctx: Context): Promise<any> {
    // const me = await this.bot.api.getMe()
    log('onStart!!', this.bot ? this.bot.botInfo.first_name : '(booting)')
    return ctx.reply(`Hey, I'm ${this.bot.botInfo.first_name}`)
  }

  @Help()
  async onHelp(@Ctx() ctx: Context): Promise<any> {
    return ctx.reply('Send me any text')
  }

  @Admin()
  @UseGuards(AdminGuard)
  async onAdminCommand(@Ctx() ctx: Context): Promise<any> {
    return ctx.reply('Welcome, Judge')
  }

  @Hears('greetings')
  async onMessage(@Ctx() ctx: Context, @Message('text', new ReverseTextPipe()) reversedText: string): Promise<any> {
    return ctx.reply(reversedText)
  }
}
