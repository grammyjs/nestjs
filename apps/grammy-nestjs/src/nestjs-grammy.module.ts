/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import {
  DynamicModule,
  Global,
  Logger,
  Module,
  OnApplicationShutdown,
  Provider,
} from '@nestjs/common';
import {
  GRAMMY_ASYNC_OPTIONS_TYPE,
  GRAMMY_MODULE_OPTIONS,
  GRAMMY_OPTIONS_TYPE,
  GrammyConfigurableModuleClass,
} from './nestjs-grammy.module-definition';
import { ListenersExplorerService, MetadataAccessorService } from './services';
import { GRAMMY_BOT_NAME } from './nestjs-grammy.constants';
import { DiscoveryModule, ModuleRef } from '@nestjs/core';
import { createBotFactory, getBotName } from './utils';
import { GrammyModuleOptions } from './interfaces';
import { Bot } from 'grammy';

const logger = new Logger('nestjs-grammy:module');

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [ListenersExplorerService, MetadataAccessorService],
})
export class NestjsGrammyModule
  extends GrammyConfigurableModuleClass
  implements OnApplicationShutdown
{
  constructor(private readonly moduleRef: ModuleRef) {
    super();
  }

  static forRoot(options: typeof GRAMMY_OPTIONS_TYPE): DynamicModule {
    const grammyBotName = getBotName(options.botName);

    const grammyBotNameProvider: Provider = {
      provide: GRAMMY_BOT_NAME,
      useValue: grammyBotName,
    };

    const grammyBotProvider: Provider = {
      provide: grammyBotName,
      useFactory: () => createBotFactory(options),
    };

    const { providers, exports, ...rest } = super.forRoot(options);

    return {
      providers: [
        ...(providers ?? []),
        grammyBotNameProvider,
        grammyBotProvider,
      ],
      exports: [...(exports ?? []), grammyBotNameProvider, grammyBotProvider],
      ...rest,
    };
  }

  static forRootAsync(
    options: typeof GRAMMY_ASYNC_OPTIONS_TYPE & {
      botName?: string;
    },
  ): DynamicModule {
    const grammyBotName = getBotName(options.botName);

    const grammyBotNameProvider: Provider = {
      provide: GRAMMY_BOT_NAME,
      useValue: grammyBotName,
    };

    const grammyBotProvider: Provider = {
      provide: grammyBotName,
      useFactory: (options: GrammyModuleOptions) => createBotFactory(options),
      inject: [GRAMMY_MODULE_OPTIONS],
    };

    const { providers, exports, ...rest } = super.forRootAsync(options);

    return {
      providers: [
        ...(providers ?? []),
        grammyBotNameProvider,
        grammyBotProvider,
      ],
      exports: [...(exports ?? []), grammyBotNameProvider, grammyBotProvider],
      ...rest,
    };
  }

  async onApplicationShutdown(): Promise<void> {
    const botName = this.moduleRef.get<string>(GRAMMY_BOT_NAME);
    logger.debug(`GrammyCoreModule: ${botName} shutting down`);
    const bot = this.moduleRef.get<Bot | undefined>(botName);
    await bot?.stop();
  }
}
