import { Module, DynamicModule } from '@nestjs/common'
import { GrammyCoreModule } from './nestjs-grammy-core.module'
import { GrammyModuleOptions, GrammyModuleAsyncOptions } from './interfaces'

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class NestjsGrammyModule {
  public static forRoot(options: GrammyModuleOptions): DynamicModule {
    return {
      module: NestjsGrammyModule,
      imports: [GrammyCoreModule.forRoot(options)],
      exports: [GrammyCoreModule],
    }
  }

  public static forRootAsync(options: GrammyModuleAsyncOptions): DynamicModule {
    return {
      module: NestjsGrammyModule,
      imports: [GrammyCoreModule.forRootAsync(options)],
      exports: [GrammyCoreModule],
    }
  }
}
