import { z } from 'zod';
import { apiObject } from '#/core';
/** Cursors for REST API pagination */

export const CursorNextPageModelSchema = apiObject({
  /** Cursor to fetch next page */
  next: z.string().nullish(),
});

export type CursorNextPageModel = z.infer<typeof CursorNextPageModelSchema>;
