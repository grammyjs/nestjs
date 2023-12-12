import { ArgumentsHost } from '@nestjs/common';
import { Context } from 'grammy';

export interface TgArgumentsHost extends ArgumentsHost {
  getContext<T extends Context = Context>(): T;
  getNext<T = any>(): T;
}
