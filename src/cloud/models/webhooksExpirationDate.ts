import { z } from 'zod';
import { apiObject } from '#/core';
/** The date the refreshed webhooks expire. */

export const WebhooksExpirationDateSchema = apiObject({
  /** The expiration date of all the refreshed webhooks. */
  expirationDate: z.number(),
});

export type WebhooksExpirationDate = z.infer<typeof WebhooksExpirationDateSchema>;
