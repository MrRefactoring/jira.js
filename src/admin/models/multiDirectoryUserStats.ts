import { z } from 'zod';
import { apiObject } from '#/core';
import { RoleIdCountsSchema } from './roleIdCounts';
import { AccountStatusCountsSchema } from './accountStatusCounts';

export const MultiDirectoryUserStatsSchema = apiObject({
  /** User counts associated with different role IDs. */
  roles: z.array(RoleIdCountsSchema).optional(),
  /** User counts associated with different account statuses. */
  accountStatus: z.array(AccountStatusCountsSchema).optional(),
});

export type MultiDirectoryUserStats = z.infer<typeof MultiDirectoryUserStatsSchema>;
