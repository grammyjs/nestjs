import { createEmitterDecorator } from '../../utils'

/**
 * Handler for /start command.
 *
 * @see https://telegraf.js.org/#/?id=start
 */
export const Start = createEmitterDecorator('command', 'start')
