import { ModuleMetadata, Type } from '@nestjs/common/interfaces'
import { Middleware, BotConfig, PollingOptions } from 'grammy'

export interface GrammyModuleOptions {
  token: string
  botName?: string
  options?: Partial<BotConfig<any>>
  pollingOptions?: PollingOptions | false
  useWebhook?: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  include?: Function[]
  middlewares?: ReadonlyArray<Middleware<any>>
}

export interface GrammyOptionsFactory {
  createGrammyOptions(): Promise<GrammyModuleOptions> | GrammyModuleOptions
}

export interface GrammyModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  botName?: string
  useExisting?: Type<GrammyOptionsFactory>
  useClass?: Type<GrammyOptionsFactory>
  useFactory?: (...args: any[]) => Promise<GrammyModuleOptions> | GrammyModuleOptions
  inject?: any[]
}
