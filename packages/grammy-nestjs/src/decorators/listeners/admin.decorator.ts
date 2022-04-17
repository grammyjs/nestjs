import { createEmitterDecorator } from '../../utils'

/**
 * Handler for /help command.
 *
 * @see https://telegraf.js.org/#/?id=help
 */
export const Admin = createEmitterDecorator('command', 'admin')
