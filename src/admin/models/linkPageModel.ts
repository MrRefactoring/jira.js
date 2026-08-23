import { z } from 'zod';
import { apiObject } from '#/core';
/** Links for a Paginated response */

export const LinkPageModelSchema = apiObject({
  /** URL to fetch this Page */
  self: z.string().nullish(),
  /** URL to fetch the Previous Page */
  prev: z.string().nullish(),
  /** URL to fetch the Next Page */
  next: z.string().nullish(),
});

export type LinkPageModel = z.infer<typeof LinkPageModelSchema>;
