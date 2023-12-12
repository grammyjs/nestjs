import {
  Admin,
  CallbackQuery,
  Ctx,
  Hears,
  Help,
  InjectBot,
  Message,
  Start,
  Update,
} from '@grammyjs/nestjs';
import { Logger, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Bot, Context, InlineKeyboard } from 'grammy';

import { FirebaseBotName } from './bot.constants';
import { FirebaseBotService } from './bot.service';
import {
  AdminGuard,
  GrammyExceptionFilter,
  ResponseTimeInterceptor,
  ReverseTextPipe,
} from './lib';

const logger = new Logger('bot:firebase-bot.update');

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(GrammyExceptionFilter)
export class WebhookUpdater {
  private readonly inlineKeyboard: InlineKeyboard;

  constructor(
    @InjectBot(FirebaseBotName)
    private readonly bot: Bot<Context>,
    private readonly botService: FirebaseBotService,
  ) {
    this.botService.showBot();
    this.inlineKeyboard = new InlineKeyboard().text('click', 'click-payload');
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    logger.log(
      'onStart!!',
      this.bot ? this.bot.botInfo.first_name : '(booting)',
    );

    return ctx.reply('Curious? Click me!', {
      reply_markup: this.inlineKeyboard,
    });
  }

  @CallbackQuery('click-payload')
  async onCallback(@Ctx() ctx: Context) {
    return ctx.answerCallbackQuery({
      text: 'You were curious, indeed!',
    });
  }

  @Help()
  async onHelp(@Ctx() ctx: Context) {
    return ctx.reply('Send me any text');
  }

  @Admin()
  @UseGuards(AdminGuard)
  async onAdminCommand(@Ctx() ctx: Context) {
    return ctx.reply('Welcome, Judge');
  }

  @Hears('greetings')
  async onMessage(
    @Ctx() ctx: Context,
    @Message('text', new ReverseTextPipe()) reversedText: string,
  ) {
    return ctx.reply(reversedText);
  }
}
