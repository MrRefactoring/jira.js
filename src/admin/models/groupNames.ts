import { z } from 'zod';
import { apiObject } from '#/core';

export const GroupNamesSchema = apiObject({
  /** The list of group names to filter by */
  eq: z.array(z.string().max(100, 'eq must be at most 100 characters')).optional(),
  /** Partial group name filter */
  contains: z.string().optional(),
});

export type GroupNames = z.infer<typeof GroupNamesSchema>;
