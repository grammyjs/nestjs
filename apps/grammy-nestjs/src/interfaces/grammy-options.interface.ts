import { Middleware, BotConfig, PollingOptions } from 'grammy';
import { Context } from 'grammy/out/context';

export interface GrammyModuleOptions<C extends Context = any> {
  token: string;
  botName?: string;
  options?: Partial<BotConfig<C>>;
  pollingOptions?: PollingOptions | false;
  useWebhook?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  include?: Function[];
  middlewares?: ReadonlyArray<Middleware<C>>;
}
