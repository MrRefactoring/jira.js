import { z } from 'zod';
import { apiObject } from '#/core';
/** Total group counts across the organization. */

export const GroupTotalCountsSchema = apiObject({
  /** The total number of groups in the organization. */
  all: z.number().optional(),
  /** The total number of groups that are synced with an identity provider. */
  synced: z.number().optional(),
  /** The total number of groups that are managed by an external source. */
  managed: z.number().optional(),
});

export type GroupTotalCounts = z.infer<typeof GroupTotalCountsSchema>;
