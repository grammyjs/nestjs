import { Context } from 'grammy';
import { Chat } from '@grammyjs/types';

type MaybeArray<T> = T | Array<T>;
type MaybePromise<T> = T | Promise<T>;

export interface ComposerMetadataChatType {
  method: 'chatType';
  arg: MaybeArray<Chat['type']>;
}

export interface ComposerMetadataPredicate {
  method: 'filter' | 'drop';
  arg: (ctx: Context) => MaybePromise<boolean>;
}

export type ComposerMetadata =
  | ComposerMetadataChatType
  | ComposerMetadataPredicate;
