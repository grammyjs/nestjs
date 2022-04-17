import { SetMetadata } from '@nestjs/common'
import { UPDATE_METADATA } from '../../nestjs-grammy.constants'

/**
 * `@Update` decorator, it's like NestJS `@Controller` decorator,
 * but for Telegram Bot API updates.
 */
export const Update = (): ClassDecorator => SetMetadata(UPDATE_METADATA, true)
