import { z } from 'zod';
import { apiObject } from '#/core';

export function pageSchema<T extends z.ZodType>(item: T) {
  return apiObject({
    /** The maximum number of items a page can hold. */
    maxResults: z.number(),
    /** The index of the first item in this page. */
    startAt: z.number(),
    /** The number of items across every page. */
    total: z.number().optional(),
    /** Whether this is the last page. */
    isLast: z.boolean(),
    values: z.array(item),
  });
}

export type Page<T> = z.infer<ReturnType<typeof pageSchema<z.ZodType<T>>>>;
