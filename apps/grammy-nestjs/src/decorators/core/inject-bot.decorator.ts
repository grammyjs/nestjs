import { Inject } from '@nestjs/common';
import { getBotName } from '../../utils';

export const InjectBot = (botName?: string): ParameterDecorator =>
  Inject(getBotName(botName));
