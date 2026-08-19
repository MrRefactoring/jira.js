import { z } from 'zod';
import { apiObject } from '#/core';

export function pageSchema<T extends z.ZodType>(item: T) {
  return apiObject({
    isLast: z.boolean().optional(),
    maxResults: z.number().optional(),
    startAt: z.number().optional(),
    total: z.number().optional(),
    values: z.array(item).optional(),
  });
}

export type Page<T> = z.infer<ReturnType<typeof pageSchema<z.ZodType<T>>>>;
