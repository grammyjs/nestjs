import debug from 'debug'
const log = debug('bot:firebase')

import { initializeApp } from 'firebase/app'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} = process.env
const params = {
  apiKey: FIREBASE_API_KEY as string,
  authDomain: FIREBASE_AUTH_DOMAIN as string,
  databaseURL: FIREBASE_DATABASE_URL as string,
  projectId: FIREBASE_PROJECT_ID as string,
  storageBucket: FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID as string,
  appId: FIREBASE_APP_ID as string,
}

export const defaultProject = initializeApp(params)

export const adminProject = admin.initializeApp(functions.config().firebase)

export const db = adminProject.firestore()
