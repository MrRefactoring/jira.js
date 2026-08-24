import { z } from 'zod';
import { apiObject } from '#/core';
import { PagedLinkSchema } from './pagedLink';

export function pageSchema<T extends z.ZodType>(item: T) {
  return apiObject({
    _expands: z.array(z.string()).optional(),
    size: z.number().optional(),
    start: z.number().optional(),
    limit: z.number().optional(),
    isLastPage: z.boolean().optional(),
    _links: PagedLinkSchema.optional(),
    values: z.array(item).optional(),
    maxResultWindow: z.number().optional(),
  });
}

export type Page<T> = z.infer<ReturnType<typeof pageSchema<z.ZodType<T>>>>;
