import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

export const GRAMMY_BOT_NAME = Symbol('GRAMMY_BOT_NAME');
export const DEFAULT_BOT_NAME = 'DEFAULT_BOT_NAME';
export const UPDATE_METADATA = Symbol('UPDATE_METADATA');
export const LISTENERS_METADATA = Symbol('LISTENERS_METADATA');
export const COMPOSER_METADATA = Symbol('COMPOSER_METADATA');
export const PARAM_ARGS_METADATA = ROUTE_ARGS_METADATA;
