import { z } from 'zod';

/** The date the refreshed webhooks expire. */
export const WebhooksExpirationDateSchema = z.object({
  /** The expiration date of all the refreshed webhooks. */
  expirationDate: z.number().int(),
});

export type WebhooksExpirationDate = z.infer<typeof WebhooksExpirationDateSchema>;
