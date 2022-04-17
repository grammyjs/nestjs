import { Module } from '@nestjs/common'
import { EchoUpdate } from './echo.update'
import { EchoService } from './echo.service'

@Module({
  providers: [EchoService, EchoUpdate],
  imports: [],
})
export class EchoBotModule {}
