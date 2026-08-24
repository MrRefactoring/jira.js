import { BaseSequencer } from 'vitest/node';

export function lastOfAll(marker: string): typeof BaseSequencer {
  return class extends BaseSequencer {
    async sort(files: Parameters<BaseSequencer['sort']>[0]): ReturnType<BaseSequencer['sort']> {
      const sorted = await super.sort(files);
      const isLast = (file: (typeof sorted)[number]): boolean => file.moduleId.includes(marker);

      return [...sorted.filter(file => !isLast(file)), ...sorted.filter(isLast)];
    }
  };
}
