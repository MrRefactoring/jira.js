import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupTypeSchema } from './groupType';

export const GroupTypeCountsSchema = apiObject({
  type: GroupTypeSchema.optional(),
  /** The number of groups of this type in the organization. */
  count: z.number().optional(),
});

export type GroupTypeCounts = z.infer<typeof GroupTypeCountsSchema>;
