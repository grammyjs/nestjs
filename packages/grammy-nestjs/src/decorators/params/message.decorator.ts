import { PipeTransform, Type } from '@nestjs/common';
import { createGrammyPipesParamDecorator } from '../../utils/param-decorator.util';
import { GrammyParamtype } from '../../enums/grammy-paramtype.enum';

export function Message(): ParameterDecorator;
export function Message(
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator;
export function Message(
  property: string,
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator;

export function Message(
  property?: string | (Type<PipeTransform> | PipeTransform),
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
) {
  return createGrammyPipesParamDecorator(GrammyParamtype.MESSAGE)(
    property,
    ...pipes,
  );
}
