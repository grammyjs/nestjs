# grammY port of NestJS Telegraf

> :information_source: This project would not be possible without the help and assistance of [Aleksandr Bukhalo](https://t.me/bukhalo_a) and the fantastic [bukhalo/nestjs-telegraf](https://github.com/bukhalo/nestjs-telegraf) project.

## Installation and Setup

To test out this repo:

- Clone the repo
- Run `yarn install`
- Change into this sample folder via `cd packages/sample-echo-bot`
- Copy `.env.example` to `.env` and fill in with the appropriate information (leave `BOT_INFO` blank at first -- you will see a debug log showing how to fill it out in the future)
- Run:

```sh
DEBUG=bot:*,nestjs-grammy:* nx run sample-echo-bot:serve:development
```

## Demonstration

![demonstration](example.gif)
