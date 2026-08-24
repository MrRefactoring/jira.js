import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** Single sort specification for groups. */

export const GroupSortBySchema = apiObject({
  /** Field with which to sort results. */
  field: openEnum(['name']),
  /** Sort direction. */
  direction: openEnum(['asc', 'desc']),
});

export type GroupSortBy = z.infer<typeof GroupSortBySchema>;
