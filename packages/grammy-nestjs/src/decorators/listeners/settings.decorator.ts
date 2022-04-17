import { createEmitterDecorator } from '../../utils'

/**
 * Handler for /settings command.
 *
 * @see https://telegraf.js.org/#/?id=settings
 */
export const Settings = createEmitterDecorator('command', 'settings')
