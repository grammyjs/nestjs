/* eslint-disable @typescript-eslint/no-unused-vars */
import { Composer, FilterQuery, Middleware } from 'grammy'

export type Filter<T extends any[], F> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? Head extends F
    ? Filter<Tail, F>
    : [Head, ...Filter<Tail, F>]
  : []

export type StringOrRegexQuery = string | RegExp | string[]

export type CommandQuery = 'start' | 'help' | 'settings' | 'admin'

export type EmitterQuery = 'on' | 'command' | 'hears' | 'gameQuery' | 'inlineQuery'

export type ComposerMethodArgs<T extends Composer<never>, U extends FilterQuery | StringOrRegexQuery | CommandQuery> = Filter<
  Parameters<any>,
  Middleware<never>
>
