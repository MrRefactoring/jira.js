import { z } from 'zod';
import { apiObject } from '#/core';
import { AccountStatusSchema } from './accountStatus';

export const AccountStatusCountsSchema = apiObject({
  status: AccountStatusSchema.optional(),
  /** The number of accounts with the associated status. */
  count: z.number().optional(),
});

export type AccountStatusCounts = z.infer<typeof AccountStatusCountsSchema>;
