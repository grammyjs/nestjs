import { DocumentData, CollectionReference } from 'firebase-admin/firestore'
import { isEmpty } from 'lodash'
import {
  AppConfig,
  BotConfig,
  defaultAppConfig,
  AllConfig,
  APP_CONFIG_ID,
  BOT_CONFIG_ID,
  CONFIG_COLLECTION_NAME,
} from '../models/Config'
import { db } from './firebase'

export class FirestoreUtils {
  createCollection<T = DocumentData>(collectionName: string): CollectionReference<T> {
    return db.collection(collectionName) as CollectionReference<T>
  }

  configCollection() {
    return this.createCollection<AllConfig>(CONFIG_COLLECTION_NAME)
  }

  async _getDoc<T>(ref: FirebaseFirestore.DocumentReference<T>, dflt: T): Promise<T> {
    const cur = await ref.get()
    if (!cur) {
      return dflt
    }
    const cfg = cur.data()
    if (!cfg || isEmpty(cfg)) {
      return dflt
    }
    return cfg
  }

  async getAppConfig(): Promise<AppConfig> {
    return this._getDoc(this.configCollection().doc(APP_CONFIG_ID), defaultAppConfig)
  }

  async setAppConfig(cfg: AppConfig): Promise<void> {
    await this.configCollection().doc(APP_CONFIG_ID).set(cfg)
  }

  async getBotConfig(): Promise<BotConfig> {
    return this._getDoc(this.configCollection().doc(BOT_CONFIG_ID), null)
  }

  async setBotConfig(cfg: BotConfig): Promise<void> {
    await this.configCollection().doc(BOT_CONFIG_ID).set(cfg)
  }
}
