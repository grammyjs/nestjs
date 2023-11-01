import { createBotDecorator } from '../../utils';

/**
 * Registers middleware for handling text messages.
 *
 * @see https://grammy.dev/plugins/i18n#listening-for-localized-text
 */
export const Hears = createBotDecorator('hears');
