import { ConfigurableModuleBuilder } from '@nestjs/common';
import { GrammyModuleOptions } from './interfaces';

export const {
  ConfigurableModuleClass: GrammyConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: GRAMMY_MODULE_OPTIONS,
  OPTIONS_TYPE: GRAMMY_OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE: GRAMMY_ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<GrammyModuleOptions>()
  .setFactoryMethodName('forRootAsync')
  .setClassMethodName('forRoot')
  .build();
