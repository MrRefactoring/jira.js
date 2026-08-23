import { z } from 'zod';
import { apiObject } from '#/core';
/** Links for a resource with a self cursor, for use in a cursor parameter. */

export const LinkSelfCursorSchema = apiObject({
  /** Cursor to fetch this resource. */
  self: z.string().nullish(),
});

export type LinkSelfCursor = z.infer<typeof LinkSelfCursorSchema>;
