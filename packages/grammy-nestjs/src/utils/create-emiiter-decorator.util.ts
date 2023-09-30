import { Composer, FilterQuery } from 'grammy';
import {
  ComposerMethodArgs,
  StringOrRegexQuery,
  BotQuery,
  CommandQuery,
} from '../types/grammy-types';
import { LISTENERS_METADATA } from '../nestjs-grammy.constants';
import { ListenerMetadata } from '../interfaces';

export function createBotDecorator<
  TComposer extends Composer<never>,
  TSearch extends BotQuery,
>(emitter: BotQuery, method?: CommandQuery) {
  return (
    search?: FilterQuery | StringOrRegexQuery,
    ...args: ComposerMethodArgs<TComposer, TSearch>
  ): MethodDecorator => {
    return (
      _target: any,
      _key?: string | symbol,
      descriptor?: TypedPropertyDescriptor<any>,
    ) => {
      const metadata = [
        {
          method: method || search,
          args,
          emitter,
        } as ListenerMetadata,
      ];

      const previousValue =
        Reflect.getMetadata(LISTENERS_METADATA, descriptor.value) || [];
      const value = [...previousValue, ...metadata];
      Reflect.defineMetadata(LISTENERS_METADATA, value, descriptor.value);

      return descriptor;
    };
  };
}
