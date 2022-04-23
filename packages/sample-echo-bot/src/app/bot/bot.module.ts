import { Module } from '@nestjs/common'
import { EchoUpdate } from './bot.update'
import { EchoService } from './bot.service'

@Module({
  providers: [EchoService, EchoUpdate],
  imports: [],
})
export class EchoBotModule {}
