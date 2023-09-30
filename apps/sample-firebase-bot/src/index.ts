import { Logger } from '@nestjs/common';

require('firebase-functions/lib/logger/compat');
import 'source-map-support/register';

import 'dotenv/config';

const logger = new Logger('bot:main');

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';

import { CommandModule } from './app/command.module';
import { WebhookModule } from './app/webhook.module';

const { BOT_TOKEN, BOT_INFO, DEBUG } = process.env;
logger.debug({ BOT_TOKEN, BOT_INFO, DEBUG });

if (!BOT_TOKEN) throw new Error(`Cannot start: No BOT_TOKEN in environment`);
if (!BOT_INFO) throw new Error(`Cannot start: No BOT_INFO in environment`);

const expressServer = express();

export const command = functions.https.onRequest(async (request, response) => {
  logger.debug('Starting to create the CommandModule function');
  const app = await NestFactory.create(
    CommandModule,
    new ExpressAdapter(expressServer),
  );
  await app.init();
  expressServer(request, response);
});

export const webhook = functions.https.onRequest(async (request, response) => {
  logger.debug('Starting to create the WebhookModule function');
  const app = await NestFactory.create(
    WebhookModule,
    new ExpressAdapter(expressServer),
  );
  await app.init();
  expressServer(request, response);
});
