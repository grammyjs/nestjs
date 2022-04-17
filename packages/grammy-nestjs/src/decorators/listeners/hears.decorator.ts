import { createEmitterDecorator } from '../../utils'

/**
 * Registers middleware for handling text messages.
 *
 * @see https://telegraf.js.org/#/?id=hears
 */
export const Hears = createEmitterDecorator('hears')
