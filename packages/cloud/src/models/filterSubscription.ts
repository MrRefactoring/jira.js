import { z } from 'zod';
import { GroupNameSchema } from '#/models/groupName';
import { DashboardUserSchema } from '#/models/dashboardUser';

/** Details of a user or group subscribing to a filter. */
export const FilterSubscriptionSchema = z.object({
  group: GroupNameSchema.optional(),
  /** The ID of the filter subscription. */
  id: z.number().optional(),
  user: DashboardUserSchema.optional(),
});

export type FilterSubscription = z.infer<typeof FilterSubscriptionSchema>;
