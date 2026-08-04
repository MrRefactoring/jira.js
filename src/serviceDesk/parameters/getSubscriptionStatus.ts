import { z } from 'zod';

export const GetSubscriptionStatusSchema = z.object({
  /** The ID or key of the customer request to be queried for subscription status. */
  issueIdOrKey: z.string(),
});

export type GetSubscriptionStatus = z.input<typeof GetSubscriptionStatusSchema>;
