import { createGrammyParamDecorator } from '../../utils/param-decorator.util'
import { GrammyParamtype } from '../../enums/grammy-paramtype.enum'

export const Next: () => ParameterDecorator = createGrammyParamDecorator(GrammyParamtype.NEXT)
