import { createBotDecorator } from '../../utils'

/**
 * Registers middleware for handling keyboard callbacks
 *
 * @see https://grammy.dev/plugins/keyboard.html#responding-to-clicks
 */
export const CallbackQuery = createBotDecorator('callbackQuery')
