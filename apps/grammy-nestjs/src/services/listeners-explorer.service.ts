import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ModuleRef, ModulesContainer } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { Module } from '@nestjs/core/injector/module';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { Bot } from 'grammy';

import { MetadataAccessorService } from './metadata-accessor.service';
import {
  PARAM_ARGS_METADATA,
  GRAMMY_BOT_NAME,
} from '../nestjs-grammy.constants';
import { BaseExplorerService } from './base-explorer.service';
import { GrammyParamsFactory } from '../factories/grammy-params-factory';
import { GrammyModuleOptions } from '../interfaces';
import { GRAMMY_MODULE_OPTIONS } from '../nestjs-grammy.module-definition';
import { Controller } from '@nestjs/common/interfaces';

const logger = new Logger('nestjs-grammy:listeners-explorer.service');

@Injectable()
export class ListenersExplorerService
  extends BaseExplorerService
  implements OnModuleInit
{
  private readonly grammyParamsFactory = new GrammyParamsFactory();

  private bot!: Bot;

  constructor(
    @Inject(GRAMMY_MODULE_OPTIONS)
    private readonly grammyOptions: GrammyModuleOptions,
    @Inject(GRAMMY_BOT_NAME)
    private readonly botName: string,
    private readonly moduleRef: ModuleRef,
    private readonly metadataAccessor: MetadataAccessorService,
    private readonly metadataScanner: MetadataScanner,
    private readonly modulesContainer: ModulesContainer,
    private readonly externalContextCreator: ExternalContextCreator,
  ) {
    super();
  }

  async onModuleInit() {
    this.bot = this.moduleRef.get<Bot>(this.botName, {
      strict: false,
    });

    this.explore();

    if (!this.grammyOptions.useWebhook) {
      logger.debug('pollingOptions: ', this.grammyOptions.pollingOptions);
      await this.bot.start(this.grammyOptions.pollingOptions || {});
    }
  }

  explore(): void {
    const modules = this.getModules(
      this.modulesContainer,
      this.grammyOptions.include,
    );

    this.registerUpdates(modules);
  }

  private registerUpdates(modules: Module[]): void {
    const updates = this.flatMap(modules, (wrapper) => {
      if (!wrapper.instance) return;

      const isUpdate = this.metadataAccessor.isUpdate(wrapper.metatype);
      if (!isUpdate) return;

      return wrapper;
    });
    updates.forEach((wrapper) => this.registerListeners(this.bot, wrapper));
  }

  private registerListeners(
    bot: Bot,
    wrapper: InstanceWrapper<Controller>,
  ): void {
    const { instance } = wrapper;
    const prototype = Object.getPrototypeOf(instance);

    for (const name of this.metadataScanner.getAllMethodNames(prototype)) {
      this.registerIfListener(bot, instance, prototype, name);
    }
  }

  private registerIfListener(
    bot: Bot,
    instance: Controller,
    prototype: any,
    methodName: string,
  ): void {
    const methodRef = prototype[methodName];
    const metadata = this.metadataAccessor.getListenerMetadata(methodRef);

    if (!metadata?.length) {
      return undefined;
    }

    const botByMetadata = this.setupBotWithMetadata(bot, methodRef);
    const paramsFactory = this.grammyParamsFactory;

    const listenerCallbackFn = this.externalContextCreator.create(
      instance,
      prototype[methodName],
      methodName,
      PARAM_ARGS_METADATA,
      paramsFactory,
      undefined,
      undefined,
      undefined,
      'grammy',
    );

    for (const { method, emitter } of metadata) {
      logger.debug(`Setting up listener for bot.${emitter}('${method}')`);

      (botByMetadata as any)[emitter](method as string, listenerCallbackFn);
    }
  }

  setupBotWithMetadata(bot: Bot, methodRef: Function) {
    const metadata = this.metadataAccessor.getBotMetadata(methodRef);
    if (!metadata) return bot;

    let botWithFilters = bot;

    for (const { method, arg } of metadata) {
      logger.debug(`Setting up bot for bot.${method}(${arg})`);

      // Looks like TypeScript bug, so I hacked it with 'as any'
      botWithFilters = (botWithFilters as any)[method](arg) as Bot;
    }

    return botWithFilters;
  }
}
