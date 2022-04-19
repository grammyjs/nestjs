require('firebase-functions/lib/logger/compat')
import 'source-map-support/register'
import 'dotenv/config'
import debug from 'debug'
const log = debug('bot:main')

import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import * as express from 'express'
import * as functions from 'firebase-functions'

import { AppModule } from './app/app.module'

const { WEBHOOK_URL, BOT_INFO, DEBUG } = process.env
log({ WEBHOOK_URL, BOT_INFO, DEBUG })

if (!WEBHOOK_URL) throw new Error(`Cannot start: No WEBHOOK_URL in environment`)
if (!BOT_INFO) throw new Error(`Cannot start: No BOT_INFO in environment`)

const expressServer = express()

const createFunction = async (expressInstance): Promise<void> => {
  log('Starting to create the function')
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance))
  app.use(express.json())
  await app.init()
}

export const bot = functions.region('us-central1').https.onRequest(async (request, response) => {
  await createFunction(expressServer)
  expressServer(request, response)
})
