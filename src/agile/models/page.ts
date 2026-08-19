import { z } from 'zod';
import { apiObject } from '#/core';

export function pageSchema<T extends z.ZodType>(item: T) {
  return apiObject({
    isLast: z.boolean(),
    maxResults: z.number(),
    startAt: z.number(),
    total: z.number(),
    values: z.array(item),
  });
}

export type Page<T> = z.infer<ReturnType<typeof pageSchema<z.ZodType<T>>>>;
