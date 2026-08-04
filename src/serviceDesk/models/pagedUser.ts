import { z } from 'zod';
import { apiObject } from '#/core';
import { PagedLinkSchema } from './pagedLink';
import { UserSchema } from './user';

export const PagedUserSchema = apiObject({
  _expands: z.array(z.string()).optional(),
  _links: PagedLinkSchema.optional(),
  /** Indicates if this is the last page of records (true) or not (false). */
  isLastPage: z.boolean().optional(),
  /** Number of items to be returned per page, up to the maximum set for these objects in the current implementation. */
  limit: z.number().optional(),
  /** Number of items returned in the page. */
  size: z.number().optional(),
  /** Index of the first item returned in the page. */
  start: z.number().optional(),
  /** Details of the items included in the page. */
  values: z.array(UserSchema).optional(),
});

export type PagedUser = z.infer<typeof PagedUserSchema>;
