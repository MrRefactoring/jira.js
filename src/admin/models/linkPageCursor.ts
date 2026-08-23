import { z } from 'zod';
import { apiObject } from '#/core';
/** Links for a paginated response, for use in a cursor parameter. */

export const LinkPageCursorSchema = apiObject({
  /** Cursor to fetch this page. */
  self: z.string().optional(),
  /** Cursor to fetch the previous page. */
  prev: z.string().optional(),
  /** Cursor to fetch the next page. */
  next: z.string().optional(),
});

export type LinkPageCursor = z.infer<typeof LinkPageCursorSchema>;
