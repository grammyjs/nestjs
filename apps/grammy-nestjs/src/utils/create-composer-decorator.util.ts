import {
  ComposerMetadata,
  ComposerMetadataChatType,
  ComposerMetadataPredicate,
} from '../interfaces';
import { COMPOSER_METADATA } from '../nestjs-grammy.constants';

export function createComposerDecorator(
  method: ComposerMetadataChatType['method'],
): (arg: ComposerMetadataChatType['arg']) => MethodDecorator;
export function createComposerDecorator(
  method: ComposerMetadataPredicate['method'],
): (arg: ComposerMetadataPredicate['arg']) => MethodDecorator;

export function createComposerDecorator<TArg extends ComposerMetadata['arg']>(
  method: ComposerMetadata['method'],
) {
  return (arg: TArg): MethodDecorator => {
    return (
      _target: any,
      _key?: string | symbol,
      descriptor?: TypedPropertyDescriptor<any>,
    ) => {
      const metadata = [
        {
          method,
          arg,
        } as ComposerMetadata,
      ];

      const prevValue =
        Reflect.getMetadata(COMPOSER_METADATA, descriptor.value) || [];
      const value = [...prevValue, ...metadata];
      Reflect.defineMetadata(COMPOSER_METADATA, value, descriptor.value);

      return descriptor;
    };
  };
}
