import { Context } from 'grammy';
import { ChatTypesEnum } from '../types';

type MaybeArray<T> = T | Array<T>;
type MaybePromise<T> = T | Promise<T>;

export interface ComposerMetadataChatType {
  method: 'chatType';
  arg: MaybeArray<ChatTypesEnum>;
}

export interface ComposerMetadataPredicate {
  method: 'filter' | 'drop';
  arg: (ctx: Context) => MaybePromise<boolean>;
}

export type ComposerMetadata =
  | ComposerMetadataChatType
  | ComposerMetadataPredicate;
