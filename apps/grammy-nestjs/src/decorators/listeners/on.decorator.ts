import { createBotDecorator } from '../../utils';

/**
 * Registers middleware for provided update type.
 *
 * @see https://grammy.dev/guide/filter-queries#filter-queries-and-bot-on
 */
export const On = createBotDecorator('on');
