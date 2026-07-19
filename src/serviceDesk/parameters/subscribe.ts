import { z } from 'zod';

export const SubscribeSchema = z.object({
  /** The ID or key of the customer request to be subscribed to. */
  issueIdOrKey: z.string(),
});

export type Subscribe = z.input<typeof SubscribeSchema>;
