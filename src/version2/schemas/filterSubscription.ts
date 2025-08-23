import { z } from 'zod';

/** Details of a user or group subscribing to a filter. */
export const FilterSubscriptionSchema = z.object({
  /** The group subscribing to filter. */
  group: z.unknown().optional(),
  /** The ID of the filter subscription. */
  id: z.number().int().optional(),
  /** The user subscribing to filter. */
  user: z.unknown().optional(),
});

export type FilterSubscription = z.infer<typeof FilterSubscriptionSchema>;
