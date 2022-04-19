export interface AppConfig {
  inited: boolean
  identified: boolean
  hooked: boolean
  webhook_url: string | null
  api_auth: string | null
}

export const defaultAppConfig: AppConfig = {
  inited: false,
  identified: false,
  hooked: false,
  webhook_url: null,
  api_auth: null,
}

export type BotConfig = any

export type AllConfig = AppConfig | BotConfig

export const CONFIG_COLLECTION_NAME = 'config'

export const APP_CONFIG_ID = 'app'

export const BOT_CONFIG_ID = 'bot'
