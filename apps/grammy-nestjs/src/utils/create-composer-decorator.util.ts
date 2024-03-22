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

export function createComposerDecorator(method: ComposerMetadata['method']) {
  return (arg: ComposerMetadata['arg']): MethodDecorator => {
    return (_target, _propertyKey, descriptor) => {
      const metadata = {
        method,
        arg,
      } as ComposerMetadata;

      const previousValue: ComposerMetadata[] =
        Reflect.getMetadata(COMPOSER_METADATA, descriptor.value!) || [];
      const value = [...previousValue, metadata];
      Reflect.defineMetadata(COMPOSER_METADATA, value, descriptor.value!);
    };
  };
}
