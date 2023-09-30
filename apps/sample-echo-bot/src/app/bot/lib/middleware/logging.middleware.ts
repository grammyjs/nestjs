import { MiddlewareFn } from 'grammy/out/composer';
import { Logger } from '@nestjs/common';

const logger = new Logger('bot:logging.middleware');

export const ResponseTime: MiddlewareFn = async (
  _ctx,
  next, // is an alias for: () => Promise<void>
): Promise<void> => {
  const before = Date.now(); // milliseconds
  await next(); // make sure to `await`!
  const after = Date.now(); // milliseconds
  logger.log(`Response time via middleware: ${after - before} ms`);
};
