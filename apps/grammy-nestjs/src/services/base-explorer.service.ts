/* eslint-disable @typescript-eslint/ban-types */
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { flattenDeep, identity, isEmpty } from 'lodash';

export class BaseExplorerService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  getModules(
    modulesContainer: Map<string, Module>,
    include: Function[],
  ): Module[] {
    const modules = [...modulesContainer.values()];

    if (isEmpty(include)) {
      return modules;
    }

    return modules.filter((module) => include.includes(module.metatype));
  }

  flatMap<T>(
    modules: Module[],
    callback: (
      instance: InstanceWrapper,
      moduleRef: Module,
    ) => T | T[] | undefined,
  ): T[] {
    const visitedModules = new Set<Module>();

    const unwrap = (moduleRef: Module) => {
      // protection from circular recursion
      if (visitedModules.has(moduleRef)) {
        return [];
      } else {
        visitedModules.add(moduleRef);
      }

      const providers = [...moduleRef.providers.values()];
      const defined = providers.map((wrapper) => callback(wrapper, moduleRef));

      const imported: (T | T[])[] = moduleRef.imports?.size
        ? [...moduleRef.imports.values()].reduce((prev, cur) => {
            return [...prev, ...unwrap(cur)];
          }, [])
        : [];

      return [...defined.filter(Boolean), ...imported];
    };

    return flattenDeep(modules.map(unwrap)).filter(identity);
  }
}
