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
    return (_target, _propertyKey, descriptor) => {
      const newMethod = method || search;

      if (!newMethod) {
        throw new Error(
          `You must provide a method name or a search query for '${emitter}`,
        );
      }

      const metadata: ListenerMetadata = {
        method: newMethod,
        args,
        emitter,
      };

      const previousValue: ListenerMetadata[] =
        Reflect.getMetadata(LISTENERS_METADATA, descriptor.value) || [];
      const value = [...previousValue, metadata];
      Reflect.defineMetadata(LISTENERS_METADATA, value, descriptor.value);
    };
  };
}
