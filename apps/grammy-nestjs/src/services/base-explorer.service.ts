/* eslint-disable @typescript-eslint/ban-types */
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { flattenDeep, identity } from 'lodash';
import { ModulesContainer } from '@nestjs/core';

export class BaseExplorerService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  getModules(
    modulesContainer: ModulesContainer,
    include?: Function[],
  ): Module[] {
    const modules = [...modulesContainer.values()];

    if (!include?.length) {
      return modules;
    }

    return modules.filter((module) => include.includes(module.metatype));
  }

  flatMap<T>(
    modules: Module[],
    callback: (instance: InstanceWrapper, moduleRef: Module) => T | undefined,
  ): T[] {
    const visitedModules = new Set<Module>();

    const unwrap = (module: Module): T[] => {
      // protection from circular recursion
      if (visitedModules.has(module)) {
        return [];
      } else {
        visitedModules.add(module);
      }

      const providers = [...module.providers.values()];
      const defined = providers
        .map((wrapper) => callback(wrapper, module))
        .filter((item) => Boolean(item));

      const imported: T[] = [];

      for (const m of module.imports) {
        imported.push(...unwrap(m));
      }

      return [...defined, ...imported] as T[];
    };

    return flattenDeep(modules.map((module) => unwrap(module))).filter(
      identity,
    );
  }
}
