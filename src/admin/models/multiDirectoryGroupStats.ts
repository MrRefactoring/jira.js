import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupTypeCountsSchema } from './groupTypeCounts';
import { GroupTotalCountsSchema } from './groupTotalCounts';

export const MultiDirectoryGroupStatsSchema = apiObject({
  /** Group counts associated with different group types. */
  types: z.array(GroupTypeCountsSchema).optional(),
  totals: GroupTotalCountsSchema.optional(),
});

export type MultiDirectoryGroupStats = z.infer<typeof MultiDirectoryGroupStatsSchema>;
