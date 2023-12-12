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
  ChatType,
  On,
  UpdateFilter,
} from '@grammyjs/nestjs';
import { Logger, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Bot, Context, InlineKeyboard } from 'grammy';

import { EchoBotName } from './bot.constants';
import {
  AdminGuard,
  GrammyExceptionFilter,
  ResponseTimeInterceptor,
  ReverseTextPipe,
} from './lib';

const logger = new Logger('bot:echo.update');

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(GrammyExceptionFilter)
export class EchoUpdate {
  private readonly inlineKeyboard = new InlineKeyboard().text(
    'click',
    'click-payload',
  );

  constructor(
    @InjectBot(EchoBotName)
    private readonly bot: Bot<Context>,
  ) {
    logger.debug(
      `Initializing`,
      bot.isInited() ? bot.botInfo.first_name : '(pending)',
    );
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    logger.debug(
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

  @On('chat_member')
  @UpdateFilter((ctx) => ctx.chatMember?.new_chat_member.status === 'member')
  greetNewMember(@Ctx() ctx: Context) {
    return ctx.reply(
      `Welcome to our chat, ${ctx.chatMember.new_chat_member.user.first_name}!`,
    );
  }

  @On('message')
  @ChatType('private')
  onPrivateMessage(@Ctx() ctx: Context) {
    return ctx.reply(
      'Hello! This is private chat. You can continue to tell me your secrets',
    );
  }
}
