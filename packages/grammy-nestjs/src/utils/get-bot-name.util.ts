import { DEFAULT_BOT_NAME } from '../nestjs-grammy.constants';

export function getBotName(name?: string): string {
  return name && name !== DEFAULT_BOT_NAME ? `${name}Bot` : DEFAULT_BOT_NAME;
}
