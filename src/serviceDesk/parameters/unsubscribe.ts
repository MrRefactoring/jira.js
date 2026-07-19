import { z } from 'zod';

export const UnsubscribeSchema = z.object({
  /** The ID or key of the customer request to be unsubscribed from. */
  issueIdOrKey: z.string(),
});

export type Unsubscribe = z.input<typeof UnsubscribeSchema>;
