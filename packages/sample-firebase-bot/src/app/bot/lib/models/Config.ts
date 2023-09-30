export interface AppConfig {
  webhook_url: string | null;
}

export const defaultAppConfig: AppConfig = {
  webhook_url: null,
};

export type BotConfig = any;

export type AllConfig = AppConfig | BotConfig;

export const CONFIG_COLLECTION_NAME = 'config';

export const APP_CONFIG_ID = 'app';

export const BOT_CONFIG_ID = 'bot';
