import { Admin, CallbackQuery, Ctx, Hears, Help, InjectBot, Message, Start, Update } from '@grammyjs/nestjs'
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import debug from 'debug'
import { Bot, Context, InlineKeyboard } from 'grammy'

import { FirebaseBotName } from './bot.constants'
import { FirebaseBotService } from './bot.service'
import { AdminGuard, GrammyExceptionFilter, ResponseTimeInterceptor, ReverseTextPipe } from './lib'

const log = debug('bot:firebase-bot.update')

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(GrammyExceptionFilter)
export class WebhookUpdater {
  private readonly inlineKeyboard: InlineKeyboard

  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
    private readonly botService: FirebaseBotService,
  ) {
    log(`Initializing`, bot.isInited() ? bot.botInfo.first_name : '(pending)')

    this.inlineKeyboard = new InlineKeyboard().text('click', 'click-payload')
  }

  @Start()
  async onStart(@Ctx() ctx: Context): Promise<any> {
    log('onStart!!', this.bot ? this.bot.botInfo.first_name : '(booting)')
    return ctx.reply('Curious? Click me!', { reply_markup: this.inlineKeyboard })
  }

  @CallbackQuery('click-payload')
  async onCallback(@Ctx() ctx: Context): Promise<any> {
    return ctx.answerCallbackQuery({
      text: 'You were curious, indeed!',
    })
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
