import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupNameSchema } from './groupName';
import { DashboardUserSchema } from './dashboardUser';
/** Details of a user or group subscribing to a filter. */

export const FilterSubscriptionSchema = apiObject({
  group: GroupNameSchema.optional(),
  /** The ID of the filter subscription. */
  id: z.number().optional(),
  user: DashboardUserSchema.optional(),
});

export type FilterSubscription = z.infer<typeof FilterSubscriptionSchema>;
