import { PipeTransform, Type } from '@nestjs/common';
import { createGrammyPipesParamDecorator } from '../../utils/param-decorator.util';
import { GrammyParamtype } from '../../enums/grammy-paramtype.enum';

export function Sender(): ParameterDecorator;
export function Sender(
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator;
export function Sender(
  property: string,
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator;

export function Sender(
  property?: string | (Type<PipeTransform> | PipeTransform),
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
) {
  return createGrammyPipesParamDecorator(GrammyParamtype.SENDER)(
    property,
    ...pipes,
  );
}
