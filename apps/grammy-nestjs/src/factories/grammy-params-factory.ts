import { ParamData } from '@nestjs/common';
import { ParamsFactory } from '@nestjs/core/helpers/external-context-creator';
import { Context } from 'grammy';
import { GrammyParamtype } from '../enums';

export class GrammyParamsFactory implements ParamsFactory {
  exchangeKeyForValue(
    type: GrammyParamtype,
    data: ParamData,
    args: unknown[],
  ): unknown {
    const ctx = args[0] as Context;
    // eslint-disable-next-line @typescript-eslint/ban-types
    const next = args[1] as Function;

    switch (type) {
      case GrammyParamtype.CONTEXT:
        return ctx;
      case GrammyParamtype.NEXT:
        return next;
      case GrammyParamtype.SENDER:
        return data && ctx.from ? ctx.from[data as string] : ctx.from;
      case GrammyParamtype.MESSAGE:
        return data && ctx.message ? ctx.message[data as string] : ctx.message;
      default:
        return null;
    }
  }
}
