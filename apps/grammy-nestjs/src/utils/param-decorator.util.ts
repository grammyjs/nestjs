import { assignMetadata, PipeTransform, Type } from '@nestjs/common';
import { isNil, isString } from '@nestjs/common/utils/shared.utils';
import { GrammyParamtype } from '../enums/grammy-paramtype.enum';
import { PARAM_ARGS_METADATA } from '../nestjs-grammy.constants';

export type ParamData = object | string | number;

export const createGrammyParamDecorator = (paramtype: GrammyParamtype) => {
  return (data?: ParamData): ParameterDecorator =>
    (target, key, index) => {
      // TODO: refactor remove linter disable
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const args =
        Reflect.getMetadata(PARAM_ARGS_METADATA, target.constructor, key) || {};
      Reflect.defineMetadata(
        PARAM_ARGS_METADATA,
        assignMetadata(args, paramtype, index, data),
        target.constructor,
        key,
      );
    };
};

export const createGrammyPipesParamDecorator =
  (paramtype: GrammyParamtype) =>
  (
    data?: any,
    ...pipes: (Type<PipeTransform> | PipeTransform)[]
  ): ParameterDecorator =>
  (target, key, index) => {
    addPipesMetadata(paramtype, data, pipes, target, key, index);
  };

export const addPipesMetadata = (
  paramtype: GrammyParamtype,
  data: any,
  pipes: (Type<PipeTransform> | PipeTransform)[],
  target: Record<string, any>,
  key: string | symbol,
  index: number,
) => {
  // TODO: refactor remove linter disable
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const args =
    Reflect.getMetadata(PARAM_ARGS_METADATA, target.constructor, key) || {};
  const hasParamData = isNil(data) || isString(data);
  const paramData = hasParamData ? data : undefined;
  // TODO: refactor remove linter disable
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const paramPipes: (Type<PipeTransform> | PipeTransform)[] = hasParamData
    ? pipes
    : [data, ...pipes];

  Reflect.defineMetadata(
    PARAM_ARGS_METADATA,
    assignMetadata(args, paramtype, index, paramData, ...paramPipes),
    target.constructor,
    key,
  );
};
