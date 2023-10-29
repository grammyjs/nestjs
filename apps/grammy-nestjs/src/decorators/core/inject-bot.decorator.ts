import { Inject } from '@nestjs/common';
import { getBotName } from '../../utils';

export function InjectBot(botName?: string): ParameterDecorator {
  return Inject(getBotName(botName));
}
