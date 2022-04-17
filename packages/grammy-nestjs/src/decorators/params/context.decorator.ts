import { GrammyParamtype } from '../../enums'
import { createGrammyParamDecorator } from '../../utils'

export const Context: () => ParameterDecorator = createGrammyParamDecorator(GrammyParamtype.CONTEXT)

export const Ctx = Context
