import { FilterQuery } from 'grammy';
export interface ListenerMetadata {
  emitter: string;
  method: FilterQuery | string | RegExp | string[] | RegExp[];
  args: unknown[];
}
