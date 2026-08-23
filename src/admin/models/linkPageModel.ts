import { z } from 'zod';
import { apiObject } from '#/core';
/** Links for a Paginated response */

export const LinkPageModelSchema = apiObject({
  /** URL to fetch this Page */
  self: z.string().optional(),
  /** URL to fetch the Previous Page */
  prev: z.string().optional(),
  /** URL to fetch the Next Page */
  next: z.string().optional(),
});

export type LinkPageModel = z.infer<typeof LinkPageModelSchema>;
