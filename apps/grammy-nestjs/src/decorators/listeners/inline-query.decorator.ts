import { createBotDecorator } from '../../utils';

/**
 * Registers middleware for handling inline_query actions with regular expressions.
 *
 * @see https://grammy.dev/guide/inline-queries#inline-queries
 */
export const InlineQuery = createBotDecorator('inlineQuery');
