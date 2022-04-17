import { ArgumentsHost } from '@nestjs/common'

export interface GrammyExceptionFilter<T = any> {
  catch(exception: T, host: ArgumentsHost): any
}
