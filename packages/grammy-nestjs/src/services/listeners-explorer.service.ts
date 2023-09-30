import debug from 'debug';
const log = debug('nestjs-grammy:listeners-explorer.service');

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef, ModulesContainer } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { Module } from '@nestjs/core/injector/module';
import { ParamMetadata } from '@nestjs/core/helpers/interfaces';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { Composer, Bot } from 'grammy';

import { MetadataAccessorService } from './metadata-accessor.service';
import {
  PARAM_ARGS_METADATA,
  GRAMMY_BOT_NAME,
  GRAMMY_MODULE_OPTIONS,
} from '../nestjs-grammy.constants';
import { BaseExplorerService } from './base-explorer.service';
import { GrammyParamsFactory } from '../factories/grammy-params-factory';
import { GrammyContextType } from '../execution-context';
import { ListenerMetadata, GrammyModuleOptions } from '../interfaces';

@Injectable()
export class ListenersExplorerService
  extends BaseExplorerService
  implements OnModuleInit
{
  private readonly grammyParamsFactory = new GrammyParamsFactory();

  private bot: Bot<any>;

  constructor(
    @Inject(GRAMMY_MODULE_OPTIONS)
    private readonly grammyOptions: GrammyModuleOptions,
    @Inject(GRAMMY_BOT_NAME)
    private readonly botName: string,
    private readonly moduleRef: ModuleRef,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: MetadataAccessorService,
    private readonly metadataScanner: MetadataScanner,
    private readonly modulesContainer: ModulesContainer,
    private readonly externalContextCreator: ExternalContextCreator,
  ) {
    super();
  }

  onModuleInit(): void {
    this.bot = this.moduleRef.get<Bot<any>>(this.botName, {
      strict: false,
    });

    this.explore();

    if (!this.grammyOptions.useWebhook) {
      log('pollingOptions: ', this.grammyOptions.pollingOptions);
      this.bot.start(this.grammyOptions.pollingOptions || {});
    }
  }

  explore(): void {
    const modules = this.getModules(
      this.modulesContainer,
      this.grammyOptions.include || [],
    );

    this.registerUpdates(modules);
  }

  private registerUpdates(modules: Module[]): void {
    const updates = this.flatMap<InstanceWrapper>(modules, (instance) =>
      this.filterUpdates(instance),
    );
    updates.forEach((wrapper) => this.registerListeners(this.bot, wrapper));
  }

  private filterUpdates(wrapper: InstanceWrapper): InstanceWrapper<unknown> {
    const { instance } = wrapper;
    if (!instance) return undefined;

    const isUpdate = this.metadataAccessor.isUpdate(wrapper.metatype);
    if (!isUpdate) return undefined;

    return wrapper;
  }

  private registerListeners(
    composer: Composer<any>,
    wrapper: InstanceWrapper<unknown>,
  ): void {
    const { instance } = wrapper;
    const prototype = Object.getPrototypeOf(instance);
    this.metadataScanner.scanFromPrototype(instance, prototype, (name) =>
      this.registerIfListener(composer, instance, prototype, name),
    );
  }

  private registerIfListener(
    composer: Composer<any>,
    instance: any,
    prototype: any,
    methodName: string,
    defaultMetadata?: ListenerMetadata[],
  ): void {
    const methodRef = prototype[methodName];
    const metadata =
      this.metadataAccessor.getListenerMetadata(methodRef) || defaultMetadata;

    if (!metadata || metadata.length < 1) {
      return undefined;
    }

    const composerByMetadata = this.setupComposerWithMetadata(
      composer,
      methodRef,
    );

    const listenerCallbackFn = this.createContextCallback(
      instance,
      prototype,
      methodName,
    );

    // TODO: do we do anything with args?
    for (const { method, emitter } of metadata) {
      log(`Setting up listener for bot.${emitter}('${method}')`);
      composerByMetadata[emitter](method, listenerCallbackFn);
    }
  }

  createContextCallback<T extends Record<string, unknown>>(
    instance: T,
    prototype: unknown,
    methodName: string,
  ) {
    const paramsFactory = this.grammyParamsFactory;

    return this.externalContextCreator.create<
      Record<number, ParamMetadata>,
      GrammyContextType
    >(
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
  }

  setupComposerWithMetadata(composer: Composer<any>, methodRef) {
    const metadata = this.metadataAccessor.getComposerMetadata(methodRef);
    if (!metadata) return composer;

    let composerWithFilters = composer;

    for (const { method, arg } of metadata) {
      log(`Setting up composer for bot.${method}(${arg})`);

      // Looks like TypeScript bug, so I hacked it with 'as any'
      composerWithFilters = (composerWithFilters as any)[method](arg);
    }

    return composerWithFilters;
  }
}
