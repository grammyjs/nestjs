<div align="center">

![issues](https://badgen.net/github/open-issues/grammyjs/nestjs)![GitHub last commit](https://img.shields.io/github/last-commit/grammyjs/nestjs)![tags](https://badgen.net/github/tags/grammyjs/nestjs)![license](https://badgen.net/badge/license/MIT/blue)

</div>

# grammY port of NestJS Telegraf

> :information_source: This project would not be possible without the help and assistance of [Aleksandr Bukhalo](https://t.me/bukhalo_a) and the fantastic [bukhalo/nestjs-telegraf](https://github.com/bukhalo/nestjs-telegraf) project.

## Table of Contents

-   [grammY port of NestJS Telegraf](#grammy-port-of-nestjs-telegraf)
    -   [Table of Contents](#table-of-contents)
    -   [Features](#features)
    -   [Installation](#installation)
    -   [Usage](#usage)
    -   [grammY instance access](#grammy-instance-access)
    -   [Asynchronous Configuration](#asynchronous-configuration)
    -   [Getting Updates](#getting-updates)
        -   [Long polling](#long-polling)
        -   [Webhooks](#webhooks)
    -   [Middlewares](#middlewares)
    -   [Multiple Bots](#multiple-bots)
    -   [Standalone Applications](#standalone-applications)

<img align="right" width="95" height="148" title="NestJS logotype"
     src="https://nestjs.com/img/logo-small.svg">

NestJS grammY – powerful solution for creating Telegram bots.

This package uses the best of the NodeJS world under the hood. [grammY](https://github.com/grammyjs/grammY) is the most powerful library for creating bots and [NestJS](https://github.com/nestjs) is a progressive framework for creating well-architectured applications. This module provides fast and easy way for creating Telegram bots and deep integration with your NestJS application.

## Features

-   Simple. Easy to use.
-   Ton of decorators available out of the box for handling bot actions.
-   Ability to create custom decorators.
-   grammY plugins and custom plugins support.
-   Ability to run multiple bots simultaneously.
-   Full support of NestJS guards, interceptors, filters and pipes!

## Installation

```bash
npm i @grammyjs/nestjs
# or
yarn add @grammyjs/nestjs
```

## Usage

Once the installation process is complete, we can import the `NestjsGrammyModule` into the root `AppModule`:

```typescript
import { Module } from '@nestjs/common'
import { NestjsGrammyModule } from '@grammyjs/nestjs'

@Module({
    imports: [
        NestjsGrammyModule.forRoot({
            token: 'TELEGRAM_BOT_TOKEN',
        }),
    ],
})
export class AppModule {}
```

Then create `app.update.ts` file and add some decorators for handling Telegram bot API updates:

```typescript
import { Bot, Context } from 'grammy'
import { InjectBot, Update, Message, Start, Hears, Ctx, Help, Admin } from '@grammyjs/nestjs'

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(GrammyExceptionFilter)
export class EchoUpdate {
    constructor(
        @InjectBot(EchoBotName)
        private readonly bot: Bot<Context>,
        private readonly echoService: EchoService,
    ) {
        log('echo update starting', this.bot ? this.bot.botInfo.id : '(booting)')
    }

    @Start()
    async onStart(@Ctx() ctx: Context): Promise<void> {
        // const me = await this.bot.api.getMe()
        log('onStart!!', this.bot ? this.bot.botInfo : '(booting)')
        ctx.reply(`Hey, I'm ${this.bot.botInfo.first_name}`)
    }

    @Help()
    async onHelp(@Ctx() ctx: Context): Promise<void> {
        ctx.reply('Send me any text')
    }

    @Admin()
    @UseGuards(AdminGuard)
    async onAdminCommand(@Ctx() ctx: Context): Promise<void> {
        ctx.reply('Welcome, Judge')
    }

    @Hears('greetings')
    async onMessage(@Ctx() ctx: Context, @Message('text', new ReverseTextPipe()) reversedText: string): Promise<void> {
        ctx.reply(reversedText)
    }

    @On('chat_member')
    @UpdateFilter(ctx => ctx.chatMember?.new_chat_member.status === 'member')
    greetNewMember(@Ctx() ctx: Context) {
        ctx.reply(`Welcome to our chat, ${ctx.chatMember.new_chat_member.user.first_name}!`)
    }

    @On('message')
    @ChatType('private')
    onPrivateMessage(@Ctx() ctx: Context) {
        ctx.reply('Hello! This is private chat. You can continue to tell me your secrets')
    }
}
```

## grammY instance access

If you want to use `grammY` instance directly, you can use `@InjectBot` for that.

```typescript
import { Injectable } from '@nestjs/common'
import { Bot, Context } from 'grammy'
import { InjectBot } from '@grammyjs/nestjs'

@Injectable()
export class EchoService {
  constructor(@InjectBot(EchoBotName) private readonly bot: Bot<Context>) {}
  ...
}
```

## Asynchronous Configuration

When you need to pass module options asynchronously instead of statically, use the forRootAsync() method. As with most dynamic modules, Nest provides several techniques to deal with async configuration.

One technique is to use a factory function:

```typescript
NestjsGrammyModule.forRootAsync({
    useFactory: () => ({
        token: 'TELEGRAM_BOT_TOKEN',
    }),
})
```

Like other [factory providers](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory), our factory function can be async and can inject dependencies through inject.

```typescript
NestjsGrammyModule.forRootAsync({
    imports: [ConfigModule.forFeature(grammyModuleConfig)],
    useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
    }),
    inject: [ConfigService],
})
```

Alternatively, you can configure the NestjsGrammyModule using a class instead of a factory, as shown below:

```typescript
NestjsGrammyModule.forRootAsync({
    useClass: MyConfigService,
})
```

The construction above instantiates `MyConfigService` inside `NestjsGrammyModule`, using it to create the required options object. Note that in this example, the `MyConfigService` has to implement the `MyOptionsFactory` interface, as shown below. The `NestjsGrammyModule` will call the `createMyOptions()` method on the instantiated object of the supplied class.

```typescript
@Injectable()
class MyConfigService implements MyOptionsFactory {
    createMyOptions(): NestjsGrammyModuleOptions {
        return {
            token: 'TELEGRAM_BOT_TOKEN',
        }
    }
}
```

If you want to reuse an existing options provider instead of creating a private copy inside the `NestjsGrammyModule`, use the `useExisting` syntax.

```typescript
NestjsGrammyModule.forRootAsync({
    imports: [ConfigModule.forFeature(grammyModuleConfig)],
    useExisting: ConfigService,
})
```

## Getting Updates

### Long polling

By default, the bot receives updates using long-polling and requires no additional action.

### Webhooks

To utilize webhooks, the best documentation is to review the [Sample Firebase Bot](tree/main/packages/sample-firebase-bot) package and how it configures webhooks.

At a high level, you simply enable webhooks and pass the webhook module as follows:

```ts
      useWebhook: true,
      include: [FirebaseWebhookModule],
```

This module must initialize the webhooks for grammY as such:

```ts
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(webhookCallback(this.bot, 'express')).forRoutes('*')
  }
```

The last step is to write the update functions in a module like this:

```ts
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

  ...
```

## Middlewares

`@grammyjs/nestjs` has support of the grammY middleware packages. To use an existing middleware package, simply import it and add it to the middlewares array:

```typescript
NestjsGrammyModule.forRoot({
  middlewares: [session()],
}),
```

## Multiple Bots

In some cases, you may need to run multiple bots at the same time. This can also be achieved with this module. To work with multiple bots, first create the bots. In this case, bot naming becomes mandatory.

```typescript
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { NestjsGrammyModule } from '@grammyjs/nestjs'

@Module({
    imports: [
        ConfigModule.forRoot(),
        NestjsGrammyModule.forRootAsync({
            imports: [ConfigModule],
            botName: 'cat',
            useFactory: (configService: ConfigService) => ({
                token: configService.get<string>('CAT_BOT_TOKEN'),
            }),
            inject: [ConfigService],
        }),
        NestjsGrammyModule.forRootAsync({
            imports: [ConfigModule.forFeature(myModuleConfig)],
            botName: 'dog',
            useFactory: async (configService: ConfigService) => ({
                token: configService.get<string>('DOG_BOT_TOKEN'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}
```

:::caution
Please note that you shouldn't have multiple bots without a name, or with the same name, otherwise they will get overridden.
:::

You can also inject the `Bot` for a given bot:

```typescript
import { Injectable } from '@nestjs/common'
import { InjectBot, Bot, Context } from '@grammyjs/nestjs'

@Injectable()
export class EchoService {
    constructor(@InjectBot('cat') private catBot: Bot<Context>) {}
}
```

To inject a given `Bot` to a custom provider (for example, factory provider), use the `getBotToken()` function passing the name of the bot as an argument.

```typescript
{
  provide: CatsService,
  useFactory: (catBot: Bot<Context>) => {
    return new CatsService(catBot);
  },
  inject: [getBotToken('cat')],
}
```

Another useful feature of the `@grammyjs/nestjs` module is the ability to choose which modules should handle updates for each launched bot. By default, module searches for handlers throughout the whole app. To limit this scan to only a subset of modules, use the include property.

```typescript
NestjsGrammyModule.forRootAsync({
  imports: [ConfigModule],
  botName: 'cat',
  useFactory: (configService: ConfigService) => ({
    token: configService.get<string>('CAT_BOT_TOKEN'),
    include: [CatsModule],
  }),
  inject: [ConfigService],
}),
```

## Standalone Applications

If you initialized your application with the [Nest CLI](https://docs.nestjs.com/cli/overview), [Express](https://expressjs.com/) framework will be installed by default along with Nest. Nest and NestJS grammY does not require Express for work. So if you don't plan to getting bot updates through webhooks, and you don't need a web server, you can remove Express.

To do this, change the `bootstrap` function in the `main.ts` file of your project on something like that:

```typescript
async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule)
}
bootstrap()
```

This initializes Nest as a **standalone application** (without any network listeners).

All that remains is to remove unused dependencies:

```bash
npm un @nestjs/platform-express @types/express
```

:::info
More information about standalone applications located at [Nest documentation](https://docs.nestjs.com/standalone-applications)
:::
