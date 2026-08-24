import { z } from 'zod';
import { apiObject } from '#/core';

export const RoleIdCountsSchema = apiObject({
  /** The ID of the role. */
  roleId: z.string().optional(),
  /** The number of users with this role. */
  count: z.number().optional(),
});

export type RoleIdCounts = z.infer<typeof RoleIdCountsSchema>;
