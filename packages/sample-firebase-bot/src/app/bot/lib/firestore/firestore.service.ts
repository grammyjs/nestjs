import { Injectable } from '@nestjs/common'
import { FirestoreUtils } from './FirestoreUtils'

@Injectable()
export class FirestoreService extends FirestoreUtils {}
