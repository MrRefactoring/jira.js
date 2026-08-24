import { z } from 'zod';
import { apiObject } from '#/core';
/** Links for a paginated response, for use in a cursor parameter. */

export const LinkPageCursorSchema = apiObject({
  /** Cursor to fetch this page. */
  self: z.string().nullish(),
  /** Cursor to fetch the previous page. */
  prev: z.string().nullish(),
  /** Cursor to fetch the next page. */
  next: z.string().nullish(),
});

export type LinkPageCursor = z.infer<typeof LinkPageCursorSchema>;
