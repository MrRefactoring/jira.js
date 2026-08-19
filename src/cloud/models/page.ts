import { z } from 'zod';
import { apiObject } from '#/core';

/** A page of items. */
export function pageSchema<T extends z.ZodType>(item: T) {
  return apiObject({
    /** Whether this is the last page. */
    isLast: z.boolean(),
    /** The maximum number of items that could be returned. */
    maxResults: z.number(),
    /** If there is another page of results, the URL of the next page. */
    nextPage: z.url().optional(),
    /** The URL of the page. */
    self: z.url().optional(),
    /** The index of the first item returned. */
    startAt: z.number(),
    /** The number of items returned. */
    total: z.number(),
    /** The list of items. */
    values: z.array(item),
  });
}

export type Page<T> = z.infer<ReturnType<typeof pageSchema<z.ZodType<T>>>>;
